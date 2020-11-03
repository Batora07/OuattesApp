import React from 'react';

import StyledFormLogin from '../elements/StyledFormLogin';

const FormLogin = (props:any):JSX.Element => {
    const [state, setState] = React.useState<any>({
        username:'',
        phone:'',
        password:'',
    });

    const {username, phone, password} = state;

    const handleChange = (e:React.ChangeEvent<HTMLInputElement>):void => {
        const inputValue:string = e.target.value;
        const inputName:string = e.target.name;
        setState(prevState => (
            {
                ...prevState,
                [inputName]: inputValue
            }
        ))
    }

    return (
        <StyledFormLogin>
            <label className="label">
                <input 
                    className="input"
                    name="username"
                    placeholder="Nom d'Utilisateur"
                    value={username}
                    onChange={handleChange}
                />
            </label>
            <label className="label">
                <input 
                    className="input"
                    name="phone"
                    placeholder="Téléphone"
                    value={phone}
                    onChange={handleChange}
                />
            </label>
            <label className="label">
                <input 
                    className="input"
                    name="password"
                    placeholder="Mot de Passe"
                    type="password"
                    value={password}
                    onChange={handleChange}
                />
            </label>
            <button onClick={() => props.onLogin(state)} className="loginBtn">CONNEXION</button>
        </StyledFormLogin>
    )
}

export default FormLogin;