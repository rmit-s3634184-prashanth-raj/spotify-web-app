import React, { Component } from "react";
import * as $ from "jquery";
import { authEndpoint, clientId, redirectUri, scopes } from "./config";
import hash from "./hash";
import Player from "./Player";
import logo from "./logo.svg";
import "./App.css";


class App extends Component {
  constructor(props) {
    super(props);
      this.state = {

        token: "",

              items: {
                  album: {
                      images: [{ url: "" }],
                      name: "",
                  },
                  artists: [{ name: "" }],
                  duration_ms: 0,                  
          },
           
          is_playing: "Paused",
          progress_ms: " ",    
          
          };
      this.getCurrentlyPlaying = this.getCurrentlyPlaying.bind(this);
        //this.getAlbumsList = this.getAlbumsList.bind(this);
  }

  componentDidMount() {
      // Set token
    let _token = hash.access_token;

    if (_token) {
      // Set token
      this.setState({
        token: _token
      });
        this.getCurrentlyPlaying(_token);
      //  this.getAlbumsList(_token);
    }
  }

  getCurrentlyPlaying(token) {
    // Make a call using the token
    $.ajax({
        url: "https://api.spotify.com/v1/me/player",
      type: "GET",
      beforeSend: (xhr) => {
        xhr.setRequestHeader("Authorization", "Bearer " + token);
      },
      success: (data) => {
       console.log("data", data);
        this.setState({
          items: data.item,
          is_playing: data.is_playing,
          progress_ms: data.progress_ms,
          
        });
      }
    });
  }


   /* getAlbumsList(token, id) {
        // Make a call using the token

        $.ajax({
            url: "https://api.spotify.com/v1/albums/${this,state.items.id}",
            type: "GET",
            beforeSend: (xhr) => {
                xhr.setRequestHeader("Authorization", "Bearer " + token);
            },
            success: (data1) => {
                console.log("data1", data1);
                this.setState({
                    name: data1.name,
                   
                });
            }
        });
    }   
    */ 


  render() {

    return (
      <div className="App">
        <header className="App-header">
          
                {!this.state.token && (
                    <a
                        className="btn btn--loginApp-link"
                        href={`${authEndpoint}?client_id=${clientId}&redirect_uri=${redirectUri}&scope=${scopes.join(
                            "%20"
                        )}&response_type=token&show_dialog=true`}
                        
            >
                        <font color="Black">Click To Login to Spotify</font>
                       
          
            </a>
          )}
          {this.state.token && (     

           <Player

              item={this.state.items}      
              is_playing={this.state.is_playing}
              progress_ms={this.state.progress_ms}                  
                    />
                )}

                {this.state.token && (
                    <div>
                           
                        <p> {this.state.name}  </p> 
                        <p> {this.state.items.album.name}  </p> 
                    </div>

                    
                )}
        </header>
        </div>
 
    );
  }
}

export default App;