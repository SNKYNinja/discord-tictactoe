import MessagingTunnel from '../messaging/MessagingTunnel';
import GameStateManager from '../state/GameStateManager';
import { EmbedColor } from '../../config/types';
import { BaseMessageOptions, GuildMember, Message } from 'discord.js';
export default class DuelRequest {
    private static readonly REACTIONS;
    private readonly manager;
    private readonly invited;
    private readonly expireTime;
    private readonly useReactions;
    private readonly embedColor;
    private tunnel;
    constructor(manager: GameStateManager, tunnel: MessagingTunnel, invited: GuildMember, expireTime?: number, useReactions?: boolean, embedColor?: EmbedColor);
    get content(): BaseMessageOptions;
    attachTo(message: Message): Promise<void>;
    private challengeButtonAnswered;
    private challengeEmojiAnswered;
    private challengeAnswered;
    private challengeExpired;
}
