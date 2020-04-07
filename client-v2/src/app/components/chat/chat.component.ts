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
        "content": string,
        "user": {},
        "channel": {}
    };
    messages: {}[] = [];
    channel: {
        "name": string,
        "history":[]
    };
    channels: {}[] = [];
    messageForm: FormGroup;
    channelForm: FormGroup;

    constructor(
        private authenticationService: AuthenticationService,
        private chatService: ChatService,
        private channelsService: ChannelsService
    ) {
        this.user = this.authenticationService.user;
    }

    ngOnInit() {
        this.channelForm = new FormGroup({
            name: new FormControl()
        });
        // this.channel = {
        //   "name": this.channelForm.value.name
        // }
        this.messageForm = new FormGroup({
            content: new FormControl(),
            user: new FormControl(),
            channel: new FormControl()
        });
        // this.message = {
        //   "content": this.messageForm.value.content,
        //   "user": this.messageForm.value.user,
        //   "channel": this.messageForm.value.channel,
        // }

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
    onSubmit() {
        // this.submitted = true;
        console.log(this.messageForm.value)
        // this.name = null
        this.messageForm.reset()
        this.channelForm.reset()
        // this.authenticationService.login(this.loginForm.value);
    }

    sendMessage() {
      console.log("SEND MESSAGE")
        console.log(this.message)
        this.chatService.sendMessage(this.messageForm.value);
        this.channels[0].histories.push(this.messageForm.value);
        this.message = {...this.messageForm.value, "content": null};
        console.log("... TEST 1")
        console.log(this.message)

    }

    createChannel() {
      console.log("FIRST ENTRY >????")
        console.log(this.channel)
        this.channelsService.createChannel(this.channelForm.value);
        // this.channels.push(this.channelForm.value);
        this.channel = null;
    }
}
