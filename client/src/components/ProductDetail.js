import React from 'react';
import { Segment, Image, Icon, Rating, Button, Comment, Form, Header } from 'semantic-ui-react';

const ProductDetail = ({ product }) => {
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

                    <Comment>
                    <Comment.Avatar src='/images/avatar/small/matt.jpg' />
                    <Comment.Content>
                        <Comment.Author as='a'>Matt</Comment.Author>
                        <Comment.Metadata>
                        <div>Today at 5:42PM</div>
                        </Comment.Metadata>
                        <Comment.Text>How artistic!</Comment.Text>
                        <Comment.Actions>
                        <Comment.Action>Reply</Comment.Action>
                        </Comment.Actions>
                    </Comment.Content>
                    </Comment>

                    <Comment>
                    <Comment.Avatar src='/images/avatar/small/elliot.jpg' />
                    <Comment.Content>
                        <Comment.Author as='a'>Elliot Fu</Comment.Author>
                        <Comment.Metadata>
                        <div>Yesterday at 12:30AM</div>
                        </Comment.Metadata>
                        <Comment.Text>
                        <p>This has been very useful for my research. Thanks as well!</p>
                        </Comment.Text>
                        <Comment.Actions>
                        <Comment.Action>Reply</Comment.Action>
                        </Comment.Actions>
                    </Comment.Content>
                    <Comment.Group>
                        <Comment>
                        <Comment.Avatar src='/images/avatar/small/jenny.jpg' />
                        <Comment.Content>
                            <Comment.Author as='a'>Jenny Hess</Comment.Author>
                            <Comment.Metadata>
                            <div>Just now</div>
                            </Comment.Metadata>
                            <Comment.Text>Elliot you are always so right :)</Comment.Text>
                            <Comment.Actions>
                            <Comment.Action>Reply</Comment.Action>
                            </Comment.Actions>
                        </Comment.Content>
                        </Comment>
                    </Comment.Group>
                    </Comment>

                    <Comment>
                    <Comment.Avatar src='/images/avatar/small/joe.jpg' />
                    <Comment.Content>
                        <Comment.Author as='a'>Joe Henderson</Comment.Author>
                        <Comment.Metadata>
                        <div>5 days ago</div>
                        </Comment.Metadata>
                        <Comment.Text>Dude, this is awesome. Thanks so much</Comment.Text>
                        <Comment.Actions>
                        <Comment.Action>Reply</Comment.Action>
                        </Comment.Actions>
                    </Comment.Content>
                    </Comment>

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