import { Component, OnInit } from '@angular/core';
﻿import { Injectable } from '@angular/core';
import { FormGroup, FormControl } from '@angular/forms';
import { ChatService } from '../../services/chat.service';
import { AppComponent } from '../../app.component';

@Component({
    selector: 'app-chat',
    templateUrl: 'chat.component.html',
    styleUrls: ['../../app.component.css']
})
export class ChatComponent implements OnInit {
    public user;
    public channelForm: FormGroup;
    public channels: {}[] = [];
    public currentChannel;
    public currentChannels: {}[] = [];

    constructor(
        private appComponent: AppComponent,
        private chatService: ChatService
    ) {
        this.user = this.appComponent.user;
        this.chatService.requestChannels();
    }

    ngOnInit() {
        this.channelForm = new FormGroup({
            name: new FormControl()
        });

        this.chatService.getChannels()
        .subscribe((data) => {
            this.channels = data;
        });

        this.chatService.getNewMessage()
        .subscribe((data) => {
            let chat = this.channels.findIndex(x => x._id == data.channel._id);
            if (chat !== -1)
                this.channels[chat].histories.push(data.history)
        });

        this.chatService.getNewChannel()
        .subscribe((channel) => {
            this.channels.push(channel);
        });

        this.chatService.getEditChannel()
        .subscribe((channel) => {
            let editChan = this.channels.findIndex(x => x._id == channel._id);
            this.channels[editChan].name = channel.name;
        });

        this.chatService.getDeleteChannel()
        .subscribe((channel) => {
            let deleteChan = this.channels.findIndex(x => x._id == channel);
            this.channels.splice(deleteChan, 1);
            let deleteChat = this.currentChannels.findIndex(x => x._id == channel);
            this.currentChannels.splice(deleteChat, 1);
            this.currentChannel = null;
        });
    }

    showChannel(channel) {
        if (this.currentChannel) {
            if (this.currentChannel !== channel._id) {
                let chat = this.currentChannels.findIndex(x => x._id == channel._id);
                if (chat !== -1) {
                    this.manageDivs( this.currentChannel, "none", "grey");
                    this.manageDivs(channel._id, "block", "#007bff");
                    this.currentChannel = channel._id;
                    this.currentChannels.push(channel);
                } else
                    this.getChan(channel);
            }
        } else {
            let chat = this.currentChannels.findIndex(x => x._id == channel._id);
            if (chat !== -1) {
                this.manageDivs(channel._id, "block", "#007bff");
                this.currentChannel = channel._id;
                this.currentChannels.push(channel);
            } else
                this.getChan(channel);
        }
    }

    getChan(channel) {
        this.currentChannel = channel._id;
        this.currentChannels.push(channel);

        let channelData = { channel: channel, user: this.user, content: "joined the chat", type: "green" };
        this.chatService.sendMessage(channelData);

        for (let i = 0; i < this.currentChannels.length; i++) {
            if (this.currentChannels[i]._id !== channel._id) {
                this.manageDivs(this.currentChannels[i]._id, "none", "grey");
            }
        }
        this.manageDivs(channel._id, "block", "#007bff");
    }

    editChannel(channel) {
        let newName = document.getElementById("update-" + channel._id).value;
        document.getElementById("update-" + channel._id).value = null;
        let channelData = { channel: channel, name: newName };
        this.chatService.editChannel(channelData);
    }

    deleteChannel(channel) {
        this.chatService.deleteChannel({ channel: channel });
    }

    closeChat(channel) {
        this.manageDivs(channel._id, "none", "rgba(0,0,0,.03)");
        let chat = this.currentChannels.findIndex(x => x._id == channel._id);
        this.currentChannels.splice(chat, 1);
        this.currentChannel = null;
        let channelData = { channel: channel, user: this.user, content: "left the chat", type: "red" };
        this.chatService.sendMessage(channelData);
    }

    sendMessage(channel) {
        let message = document.getElementById("msg-" + channel._id).value;
        document.getElementById("msg-" + channel._id).value = null;
        let channelData = { channel: channel, user: this.user, content: message, type: "black" };
        this.chatService.sendMessage(channelData);
    }

    createChannel() {
        this.test = this.channelForm.value;
        this.chatService.createChannel(this.channelForm.value);
        this.channelForm.reset();
    }

    manageDivs(id, display, color) {
        if (display !== null)
            document.getElementById("chat-" + id).style.display = display;
        if (color !== null)
            document.getElementById("channel-" + id).style.background = color;
    }
}
