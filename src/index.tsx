import React from 'react';
import ReactDOM from 'react-dom';

import 'bootstrap/dist/css/bootstrap.min.css';

class App extends React.Component<any, any> {
    constructor(props:any) {
        super(props);

        this.state = {
            loggedIn: false,
            username: 'mpeach14',
            password: 'sarajane14',
            tokenId: null,
            keys: null
        }

        this.logIn.bind(this);
    }

    async logIn() {

        var response:Response = await fetch('https://auth.weightwatchers.com/login-apis/v1/authenticate', {
            method: 'post',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                username: this.state.username,
                password: this.state.password
            })
        });
        console.log(response);

        if(response.ok) {
            var responseJson = await response.json();
            console.log(responseJson);

            const tokenId = responseJson.data.tokenId;
            this.setState({ tokenId });

            response = await fetch('https://auth.weightwatchers.com/openam/oauth2/connect/jwk_uri', {
                headers: {
                    'Content-Type': 'application/json'
                },
            });
            console.log(response);

        }

        if(response.ok) {
            var responseJson = await response.json();
            console.log(responseJson);

            const keys = responseJson.keys;
            this.setState({ keys });

            response = await fetch('https://cmx.weightwatchers.com/api/v3/cmx/operations/composed/members/~/my-day/2020-02-18', {
                headers: {
                    authorization: 'Bearer eyJ0eXAiOiJKV1QiLCJraWQiOiJXSmZKZFU5QWgyYktyc1ExOE9jKzlWRXNLNjg9IiwiYWxnIjoiUlMyNTYifQ.eyJlbnRpdGxlbWVudHMiOlsiY2xhc3NpYy1vbmxpbmUiXSwic3ViIjoiZmRkMWZhNzAtMzc4Yi00MDhiLWJmMzItNTIxMDkxOGY2NjkwIiwiYXVkaXRUcmFja2luZ0lkIjoiMDRjOGVlOWEtMTIxYy00MDJiLWE5ZTItYjEyZDA0YzhiODMxLTQyODAwNzM3OSIsImlzcyI6Imh0dHBzOi8vYXV0aC53ZWlnaHR3YXRjaGVycy5jb20vb3BlbmFtL29hdXRoMiIsInRva2VuTmFtZSI6ImlkX3Rva2VuIiwibG9jYWxlIjoiZW4tVVMiLCJub25jZSI6ImZjOWJhOWE4NmY3MDUyNTU5MTlmMWZjOTJhNmFkYjgxIiwiYXVkIjoid2ViQ01YIiwiTWVtYmVySUQiOiI0NDgwMTE3MjciLCJhenAiOiJ3ZWJDTVgiLCJhdXRoX3RpbWUiOjE1ODIwNTk3NzEsInJlYWxtIjoiL1VTIiwiZXhwIjoxNTgyMDY2OTcxLCJ0b2tlblR5cGUiOiJKV1RUb2tlbiIsImlhdCI6MTU4MjA1OTc3MX0.iS_Hjo5lbqkHRFgiRYvogbUs7QXgn_BWH4LH0Ud7EXbsk2vb7EMuHa-v7oAAY6DCOb8LvQXMZT-GWTzLp5p8CsiFA1FZdK8RSqA1KSGfpbY8ZyXJa7c0tcQyD7UQpcSnKETNytncC58d_xGThfPUie2_Nw1htRkGiuvQFGYriioUWEyYHt1caQJ2YbFqERjSY6ZwS3omoy9efHaK6aIVTK7yCtDssvTfScc-h-OnORkMnFDHSAW1aGhiElOEWGX2gqEDN6NLx4ltACFVbKGpdisaZ34WRxaXIM7vRufmXtBXNV9_DmDfOi0C9b2L3ar4yZP8IeMjcldxFf4eRnen8w',
                    referer: 'https://cmx.weightwatchers.com/nui/my-day'
                }
            });
            console.log(response);
        }        

    }

    render() {
        return (
            <div className="container pt-5">
                <div className="row">
                    <div className="col">
                        <div className="p-3 bg-light rounded">
                            <form onSubmit={event => { this.logIn(); event.preventDefault(); }}>
                                <div className="form-group">
                                    <label>Username</label>
                                    <input type="text" className="form-control" value={this.state.username} onChange={event => this.setState({ username: event.target.value })} />
                                </div>
                                <div className="form-group">
                                    <label>Password</label>
                                    <input type="text" className="form-control" value={this.state.password} onChange={event => this.setState({ password: event.target.value })} />
                                </div>
                                <button className="btn btn-primary btn-block">Log In</button>
                            </form>
                        </div>
                    </div>
                    <div className="col">
                        <dl>
                            <dd>username</dd>
                            <dt>{this.state.username}</dt>
                            <dd>password</dd>
                            <dt>{this.state.password}</dt>
                            <dd>tokenId</dd>
                            <dt>{this.state.tokenId}</dt>
                        </dl>
                    </div>
                    <div className="col">
                        
                    </div>
                </div>
            </div>
        );
    }
  }

ReactDOM.render(<App />, document.getElementById('root'));