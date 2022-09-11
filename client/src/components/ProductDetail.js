import React from 'react';
import ReactImageGallery from 'react-image-gallery';
import { connect } from 'react-redux';
import { Segment, Image, Icon, Button, Comment, Form, Header, Input } from 'semantic-ui-react';
import comercia from '../apis/comercia';
import LocationSelector from './LocationSelector';
import NewCommentForm from './NewCommentForm';
import ProductEdit from './ProductEdit';
import Rating from './Rating';



const ProductDetail = ({ product, auth, syncProducts, userPosition }) => {
    const [editView, setEditView] = React.useState(false);
    const [loading, setLoading] = React.useState(false);
    const [currentProduct, setcurrentProduct] = React.useState(product);
    const [userLikesProduct, setUserLikesProduct] = React.useState(product.rating.indexOf(auth._id) >= 0);
    const showComments = comments => {
        return comments.map((comment, idx) => {
            if(comment.replies.length === 0) {
                return (
                    <Comment.Group key={idx}>
                        <Comment>
                            <Comment.Avatar src={comment.profile_pic} alt="pic" />
                            {/* comment.owner.profile_pic */}
                            <Comment.Content>
                                <Comment.Author as='a'>{comment.name}</Comment.Author>
                                {/* comment.owner.name */}
                                <Comment.Metadata>
                                {/* <div>{comment.content}</div> */}
                                </Comment.Metadata>
                                <Comment.Text>{comment.content}</Comment.Text>
                                <Comment.Actions>
                                {/* <Comment.Action>Reply</Comment.Action> */}
                                </Comment.Actions>
                            </Comment.Content>
                        </Comment>
                    </Comment.Group>
                )
            } else {
                
                return (
                    <Comment.Group key={idx}>
                    <Comment>
                        <Comment.Avatar src={comment.owner.profile_pic} />
                        <Comment.Content>
                            <Comment.Author as='a'>{comment.owner.name}</Comment.Author>
                            <Comment.Metadata>
                            <div>{comment.date}</div>
                            </Comment.Metadata>
                            <Comment.Text>{comment.content}</Comment.Text>
                            <Comment.Actions>
                            <Comment.Action>Reply</Comment.Action>
                            </Comment.Actions>
                        </Comment.Content>
                        {showComments(comment.replies)}
                    </Comment>
                    </Comment.Group>
                )
            }
        })
    }
    
    const handleLikeButtonClick = async () => {
        if (loading) return ;
        if (userLikesProduct) {
            setUserLikesProduct(false);
            setLoading(true);
            const response = await comercia.put('/api/user_dislikes_product/', { 'id': product._id, 'userId': auth._id });
            setLoading(false);
            syncProducts();
        } else {
            setUserLikesProduct(true);
            setLoading(true);
            const response = await comercia.put('/api/user_likes_product/', { 'id': product._id, 'userId': auth._id });
            setLoading(false);
            syncProducts();
        }
    }
    
    const showButtons = (userId, ownerId, setEditView) => {
        if (userId === ownerId) {
            if (!editView) return <Button size='big' icon='edit' onClick={() => setEditView(true)}></Button>
            return <></>
        } else {
            return (
                <Button
                    basic={!userLikesProduct}
                    color='red'
                    content='Like'
                    icon='heart'
                    label={{ basic: true, color: 'red', pointing: 'left', content: product.rating.length }}
                    onClick={handleLikeButtonClick}
                    />
            )
        }
    }
    
    const showProductDetailView = (auth, setEditView, userPosition) => {
        if (!product) return
    
        const items = product.images.map(image => ({ original: image, thumbnail: image }));
        return (
            <div className='flex-container small-padding'>
                <Segment padded='very'>
                    <div className='flex-container center'>
                        <ReactImageGallery items={items} />
                        <h2>{product.name}</h2>
                        <p>{product.description}</p>
                        
                        <h1>S/ {product.price}</h1>
                        
                        <div className='flex-container horizontal around width-100'>
                            <div className='flex-container horizontal'>
                                <Icon name='building' size='large'/>
                                <h3 className='margin-0'>{product.store}</h3>
                            </div>
                            {/* <Rating value={product.rating.length}/> */}
                            <div className='flex-container horizontal'>
                                <Icon name='tag' size='large'/>
                                <h3 className='margin-0'>{product.brand}</h3>
                            </div>
                        </div>
                        <div className='flex-container horizontal'>
                            {showButtons(auth._id, product.created_by, setEditView, product)}
                            
                        </div>
                        <LocationSelector lat={product.latitude} lng={product.longitude} userPosition={userPosition}/>
                    </div>
                </Segment>
    
                <Segment padded='very'>
                    <Comment.Group>
                        <Header as='h3' dividing>Comentarios</Header>
    
                        {showComments(product.comments)}
    
                        <NewCommentForm product={product} syncProducts={syncProducts}/>
                    </Comment.Group>
                </Segment>
            </div>
        )
    }
    
    const showProductEditView = (auth, setEditView, syncProducts, userPosition) => {
    
        return (
            <div className='flex-container small-padding'>
                <Segment padded='very'>
                    <ProductEdit product={product} syncProducts={syncProducts} userPosition={userPosition} setEditView={setEditView}/>
                    <div className='flex-container horizontal'>
                        {showButtons(auth._id, product.created_by, setEditView)}
                    </div>
                    
                </Segment>
    
                <Segment padded='very'>
                    <Comment.Group>
                        <Header as='h3' dividing>
                        Comments
                        </Header>
    
                        {showComments(product.comments)}
    
                        <NewCommentForm product={product} syncProducts={syncProducts}/>
                    </Comment.Group>
                </Segment>
            </div>
        )
    }

    if (editView) {
        return showProductEditView(auth, setEditView, syncProducts, userPosition);
    }
        
    return showProductDetailView(auth, setEditView, userPosition);
};

const mapStateToProps = ({ auth }) => {
    return { auth };
}

export default connect(mapStateToProps)(ProductDetail);