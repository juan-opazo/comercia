import React from 'react';
import { Segment, Image, Icon, Rating, Button, Comment, Form, Header } from 'semantic-ui-react';

const showComments = comments => {
    return comments.map((comment, idx) => {
        if(comment.replies.length === 0) {
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

const ProductDetail = ({ product }) => {
    console.log(product)
    return (
        <div className='flex-container small-padding'>
            <Segment padded='very'>
                <Image src={product.image} fluid />
                <h2>{product.name}</h2>
                <div className='flex-container horizontal between'>
                    <Rating icon='heart' defaultRating={product.rating} maxRating={3} disabled/>
                    <a href={product.location}>
                        <Icon name='map' />
                    </a>
                </div>
                
                <h1>S/ {product.price}</h1>
                <p>{product.description}</p>
                <div className='flex-container wrap around'>
                    <div className='flex-container horizontal'>
                        <Icon name='building' size='large'/>
                        <h3 className='margin-0'>{product.store}</h3>
                    </div>
                    <div className='flex-container horizontal'>
                        <Icon name='tag' size='large'/>
                        <h3 className='margin-0'>{product.brand}</h3>
                    </div>
                </div>
                <div className='flex-container horizontal'>
                    <Button.Group>
                        <Button size='big'><Icon name='thumbs down'/></Button>
                        <Button.Or text='o' />
                        <Button size='big' positive><Icon name='thumbs up'/></Button>
                    </Button.Group>
                </div>
                
            </Segment>

            <Segment padded='very'>
                <Comment.Group>
                    <Header as='h3' dividing>
                    Comments
                    </Header>

                    {showComments(product.comments)}

                    <Form reply>
                    <Form.TextArea />
                    <Button content='Add Reply' labelPosition='left' icon='edit' primary />
                    </Form>
                </Comment.Group>
            </Segment>
        </div>
        
    );
};

export default ProductDetail;