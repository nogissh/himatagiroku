import React, { useState } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import axios from 'axios'

import Grid from '@material-ui/core/Grid'
import Button from '@material-ui/core/Button';

import InputCard from '../components/form/InputCard'

const useStyles = makeStyles({
  mt20: {
    marginTop: 20,
  },
  formButton: {
    justifyContent: 'center'
  }
});

function Form () {
  const [done, setDone] = useState('');
  const [comment, setComment] = useState('');
  const [todo, setTodo] = useState('');

  const doneChanger = (newDone) => { setDone(newDone) }
  const commentChanger = (newComment) => { setComment(newComment) }
  const todoChanger = (newTodo) => { setTodo(newTodo) }

  const messageSender = () => {
    var text = '';

    if (done === '') {
      alert('今日やったことが入力されていません')
      return
    }
    text += `*今日やったこと*\n\n${done}\n\n`;

    if (comment === '') {
      alert('コメントが入力されていません')
      return
    }
    text += `*コメント*\n\n${comment}\n\n`;

    if (todo === '') {
      alert('翌営業日の予定が入力されていません')
      return
    }
    text += `*翌営業日の予定*\n\n${todo}\n\n`;

    const url = window.localStorage.getItem('webhook');
    if (url === null || !url.match(/^http/g)) {
      alert('Webhook URLを指定してください')
      return
    }
    
    axios
      .post(url, {
        text: text,
        username: '日跨ぎ録筆者'
      }, {
        headers: { 'content-type': 'application/x-www-form-urlencoded' }
      })
      .then(() => {
        alert('投稿しました')
        setDone('')
        setComment('')
        setTodo('')
      })
      .catch(e => alert(e))
  }

  const classes = useStyles();

  return (
    <div>
      <InputCard
        title="今日やったこと"
        placeholder="今日やったことを箇条書きします"
        value={done}
        onChange={doneChanger}
      />
      <div className={ classes.mt20 }></div>
      <InputCard
        title="コメント"
        placeholder="今日やったことに対してコメントを書きます"
        value={comment}
        onChange={commentChanger}
      />
      <div className={ classes.mt20 }></div>
      <InputCard
        title="翌営業日の予定"
        placeholder="翌営業日の予定を箇条書きします"
        value={todo}
        onChange={todoChanger}
      />
      <Grid container direction="row" justify="center" alignItems="center">
        <Button
          variant="contained"
          color="primary"
          className={[classes.formButton, classes.mt20]}
          onClick={messageSender}
        >送信</Button>
      </Grid>
    </div>
  );
}

export default Form;
