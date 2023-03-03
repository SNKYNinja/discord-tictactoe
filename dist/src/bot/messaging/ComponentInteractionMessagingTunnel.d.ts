import MessagingTunnel from './MessagingTunnel';
import { GuildMember, InteractionUpdateOptions, Message, MessageComponentInteraction, TextChannel } from 'discord.js';
export default class ComponentInteractionMessagingTunnel extends MessagingTunnel {
    private readonly interaction;
    private readonly originalAuthor?;
    private _reply?;
    constructor(interaction: MessageComponentInteraction, originalAuthor?: GuildMember);
    get author(): GuildMember;
    get channel(): TextChannel;
    get reply(): Message | undefined;
    replyWith(answer: InteractionUpdateOptions, _direct?: boolean): Promise<Message>;
    editReply(answer: InteractionUpdateOptions): Promise<void>;
    end(reason: InteractionUpdateOptions): Promise<void>;
}
