import { observer } from "mobx-react-lite";
import { FC, useContext, useState } from "react";
import { Context } from '../index'

const LoginForm: FC = () => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');

    const { store } = useContext(Context)

    return (
        <div>
            <input type="text" placeholder="Email"  onChange={e => setEmail(e.target.value)} value={email}/>
            <input type="password" placeholder="Password" onChange={e => setPassword(e.target.value)}  value={password} />
            <button onClick={() => store.login(email, password)} >login</button>
            <button onClick={() => store.registration(email, password)} >registaration</button>
        </div>
    );
}

export default observer (LoginForm);