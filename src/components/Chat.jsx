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
            <div style={{marginTop: 75, textAlign: 'center'}}>
                <div>
                    <div className="card-title" style={{textAlign: 'center', fontSize: '30px'}}>Chatroom
                        <div className="inner-container card-title" style={{textAlign: 'center', fontSize: '15px'}}>Talk about your favorite tunes!</div>
                        <hr/>
                        <div style={{height: 200, overflow: 'auto', display:'flex', flexDirection:'column-reverse', backgroundColor: '#e6f7fa', textAlign: 'left', fontSize: '15px'}}>
                            {this.state.messages.map(message => {
                                return (
                                    <div style={{padding: '10px 0 10px 10px'}}>
                                      {message.author}: {message.message}
                                    </div>
                                );
                            }).reverse()}
                        </div>

                    </div>
                    <div className="card-footer">
                        <input type="text" placeholder="Username" value={this.state.username} onChange={ev => this.setState({username: ev.target.value})} className="form-control"/>
                        <br/>
                        <input type="text" placeholder="Message" className="form-control" value={this.state.message} onChange={ev => this.setState({message: ev.target.value})}/>
                        <br/>
                        <button onClick={this.sendMessage} className="btn btn-primary form-control" style={{backgroundColor: '#17a2b8', border: '#17a2b8'}}>Send</button>
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