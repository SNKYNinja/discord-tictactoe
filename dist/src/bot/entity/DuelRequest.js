"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const ComponentInteractionMessagingTunnel_1 = __importDefault(require("../messaging/ComponentInteractionMessagingTunnel"));
const localize_1 = __importDefault(require("../../i18n/localize"));
const discord_js_1 = require("discord.js");
class DuelRequest {
    constructor(manager, tunnel, invited, expireTime, useReactions, embedColor) {
        this.manager = manager;
        this.tunnel = tunnel;
        this.invited = invited;
        this.expireTime = expireTime !== null && expireTime !== void 0 ? expireTime : 60;
        this.useReactions = useReactions !== null && useReactions !== void 0 ? useReactions : false;
        this.embedColor = embedColor !== null && embedColor !== void 0 ? embedColor : 2719929;
    }
    get content() {
        const content = localize_1.default.__('duel.challenge', { initier: this.tunnel.author.displayName }) +
            '\n' +
            localize_1.default.__('duel.action');
        return {
            allowedMentions: { parse: ['users'] },
            components: !this.useReactions
                ? [
                    new discord_js_1.ActionRowBuilder().addComponents(new discord_js_1.ButtonBuilder({
                        style: discord_js_1.ButtonStyle.Success,
                        customId: 'yes',
                        label: localize_1.default.__('duel.button.accept')
                    }), new discord_js_1.ButtonBuilder({
                        style: discord_js_1.ButtonStyle.Danger,
                        customId: 'no',
                        label: localize_1.default.__('duel.button.decline')
                    }))
                ]
                : [],
            content: this.invited.toString(),
            embeds: [
                new discord_js_1.EmbedBuilder()
                    .setTitle(localize_1.default.__('duel.title'))
                    .setDescription(content)
                    .setColor(this.embedColor)
                    .setTimestamp()
                    .setAuthor({ name: initier, iconURL: this.tunnel.author.displayAvatarURL() })
            ]
        };
    }
    attachTo(message) {
        return __awaiter(this, void 0, void 0, function* () {
            if (this.useReactions) {
                for (const reaction of DuelRequest.REACTIONS) {
                    yield message.react(reaction);
                }
                return message
                    .awaitReactions({
                    filter: (reaction, user) => reaction.emoji.name != null &&
                        DuelRequest.REACTIONS.includes(reaction.emoji.name) &&
                        user.id === this.invited.id,
                    max: 1,
                    time: this.expireTime * 1000,
                    errors: ['time']
                })
                    .then(this.challengeEmojiAnswered.bind(this))
                    .catch(this.challengeExpired.bind(this));
            }
            else {
                message
                    .createMessageComponentCollector({
                    filter: interaction => interaction.user.id === this.invited.id,
                    max: 1,
                    time: this.expireTime * 1000
                })
                    .on('collect', this.challengeButtonAnswered.bind(this))
                    .on('end', (_, reason) => __awaiter(this, void 0, void 0, function* () {
                    if (reason !== 'limit') {
                        return this.challengeExpired();
                    }
                }));
            }
        });
    }
    challengeButtonAnswered(interaction) {
        return __awaiter(this, void 0, void 0, function* () {
            this.tunnel = new ComponentInteractionMessagingTunnel_1.default(interaction, this.tunnel.author);
            return this.challengeAnswered(interaction.customId === 'yes');
        });
    }
    challengeEmojiAnswered(collected) {
        return __awaiter(this, void 0, void 0, function* () {
            return this.challengeAnswered(collected.first().emoji.name === DuelRequest.REACTIONS[0]);
        });
    }
    challengeAnswered(accepted) {
        return __awaiter(this, void 0, void 0, function* () {
            if (accepted) {
                return this.manager.createGame(this.tunnel, this.invited);
            }
            else {
                return this.tunnel.end({
                    allowedMentions: { parse: [] },
                    components: [],
                    content: localize_1.default.__('duel.reject', { invited: this.invited.displayName }),
                    embeds: []
                });
            }
        });
    }
    challengeExpired() {
        return __awaiter(this, void 0, void 0, function* () {
            return this.tunnel.end({
                allowedMentions: { parse: [] },
                components: [],
                content: localize_1.default.__('duel.expire', { invited: this.invited.displayName }),
                embeds: []
            });
        });
    }
}
exports.default = DuelRequest;
DuelRequest.REACTIONS = ['????', '????'];
