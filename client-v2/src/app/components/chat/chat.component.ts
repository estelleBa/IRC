import { Component, OnInit } from '@angular/core';
import { AuthenticationService } from '../../services/authentication.service';
import { ChatService } from '../../services/chat.service';
import { ChannelsService } from '../../services/channels.service';
import { FormGroup, FormControl } from '@angular/forms';

@Component({
    selector: 'app-chat',
    templateUrl: 'chat.component.html'
})
export class ChatComponent implements OnInit {
    public user;
    message: {
        "text": string,
        "user": {},
        "channel": {}
    };
    messages: {}[] = [];
    // channel: {
    //     "name": string,
    //     "history":[]
    // };
    channels: {}[] = [];

    constructor(
        private authenticationService: AuthenticationService,
        private chatService: ChatService,
        private channelsService: ChannelsService
    ) {
        this.user = this.authenticationService.user;
    }

    ngOnInit() {
        this.channel = new FormGroup({
            name: new FormControl()
        });
        this.chatService
        .getMessages()
        .subscribe((message) => {
            this.messages.push(message);
        });

        this.channelsService
        .getChannels()
        .subscribe((channel) => {
            console.log(channel)
            this.channels.push(channel);
            console.log("SUBSCRIBE CHANNEL")
            console.log(this.channels)
        });
    }

    sendMessage() {
        console.log(this.message)
        this.chatService.sendMessage(this.message);
        this.message = null;
    }

    createChannel() {
      console.log("FIRST ENTRY >????")
        console.log(this.channel)

        this.channelsService.createChannel(this.channel);
        this.channel = null;
    }
}
