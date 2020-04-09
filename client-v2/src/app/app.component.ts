import { Component, ViewChild } from '@angular/core';
import { ChatService } from './services/chat.service';
import { ChatComponent } from './components/chat';

@Component({
      selector: 'app-root',
      templateUrl: './app.component.html',
      styleUrls: ['./app.component.css']
})
export class AppComponent {
    title = 'IRC';
    public user;
    public channelsLeft;
    @ViewChild(ChatComponent)

    set currentChannels(chan: ChatComponent) {
        if (chan !== undefined)
            this.channelsLeft = chan.currentChannels;
    };

    constructor(
        private chatService: ChatService,
    ) {}

    public login() {
        let user = document.getElementById('user').value;
        this.user = user;
    }

    public logout() {
        // let channelDatas = [];
        // for (let i = 0; i < this.channelsLeft.length; i++) {
        //     let channelData = { channel: this.channelsLeft[i], user: this.user, content: "left the chat", type: "red" };
        //     channelDatas.push(channelData);
        // }
        // this.chatService.sendMessage(channelDatas);
        this.user = null;
        this.channelsLeft = null;
        document.location.reload(true);
    }
}
