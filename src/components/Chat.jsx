import React, { Component, useContext } from "react";
import io from "socket.io-client";

class Chat extends Component{
  constructor(props){
      super(props);

      this.state = {
          username: '',
          message: '',
          messages: []
      };

      this.socket = io.connect('http://localhost:8000');

      this.socket.on('RECEIVE_MESSAGE', (data) => {
          this.addMessage(data);
      });

      this.addMessage = this.addMessage.bind(this);
      this.sendMessage = this.sendMessage.bind(this);
  }

  addMessage(data) {
    console.log(data);
    this.setState({messages: [...this.state.messages, data]});
    console.log(this.state.messages);
  }

  
  sendMessage(ev) {
    ev.preventDefault();
    this.socket.emit('SEND_MESSAGE', {
        author: this.state.username,
        message: this.state.message
    })
    this.setState({message: ''});
  }

  render(){
    console.log(this.state.messages);
      return (
        <div className="chat-container">
        <div>
            <div style={{marginTop: 75}}>
                <div>
                    <div className="inner-container card-title" style={{textAlign: 'center', fontSize: '30px'}}>Chatroom
                        <div className="inner-container card-title" style={{textAlign: 'center', fontSize: '15px'}}>Share your playlists!</div>
                        <hr/>
                        <div style={{height: 200, overflow: 'scroll'}}>
                            {this.state.messages.map(message => {
                                return (
                                    <div>
                                      {message.author}: {message.message}
                                    </div>
                                )
                            })}
                        </div>

                    </div>
                    <div className="card-footer">
                        <input type="text" placeholder="Username" value={this.state.username} onChange={ev => this.setState({username: ev.target.value})} className="form-control"/>
                        <br/>
                        <input type="text" placeholder="Message" className="form-control" value={this.state.message} onChange={ev => this.setState({message: ev.target.value})}/>
                        <br/>
                        <button onClick={this.sendMessage} className="btn btn-primary form-control">Send</button>
                    </div>
                </div>
            </div>
        </div>
    </div>
        //   <div className="chat-container" style={{margin: 200}}>
        //       <div className="row login-card">
        //           <div className="col-4 row col-9 col-md-6 d-flex align-items-center">
        //               <div className="card">
        //                   <div className="card-body">
        //                       <div className="card-title">Global Chat</div>
        //                       <hr/>
        //                       <div className="messages inner-chat-scroll">
        //                           {this.state.messages.map(message => {
        //                               return (
        //                                   <div>
        //                                     {message.author}: {message.message}
        //                                   </div>
        //                               )
        //                           })}
        //                       </div>

        //                   </div>
        //                   <div className="card-footer">
        //                       <input type="text" placeholder="Username" value={this.state.username} onChange={ev => this.setState({username: ev.target.value})} className="form-control"/>
        //                       <br/>
        //                       <input type="text" placeholder="Message" className="form-control" value={this.state.message} onChange={ev => this.setState({message: ev.target.value})}/>
        //                       <br/>
        //                       <button onClick={this.sendMessage} className="btn btn-primary form-control">Send</button>
        //                   </div>
        //               </div>
        //           </div>
        //       </div>
        //   </div>
      );
  }
}


export default Chat