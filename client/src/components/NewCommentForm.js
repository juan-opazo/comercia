import React from 'react';
import { connect } from 'react-redux';
import { Button, Comment, Form } from 'semantic-ui-react';
import comercia from '../apis/comercia';

const NewCommentForm = (props) => {
    const [text, setText] = React.useState('');
    const saveComment = async content => {
        if (!props.auth) return;
        const owner = props.auth;
        setText('');
        const response = await comercia.put('/api/add_comment_to_product/', { owner, content, id: props.product._id })
        props.syncProducts();
    }
    return (
        <Form reply onSubmit={() => saveComment(text)}>
            <Form.TextArea value={text} onChange={e => setText(e.target.value)}/>
            <Button content='Add Reply' labelPosition='left' icon='edit' primary />
        </Form>
    )
}

const mapStateToProps = ({ auth }) => {
    return { auth };
}

export default connect(mapStateToProps)(NewCommentForm);