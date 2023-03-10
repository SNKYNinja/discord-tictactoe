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
const EventHandler_1 = __importDefault(require("./bot/EventHandler"));
const TicTacToeBot_1 = __importDefault(require("./bot/TicTacToeBot"));
const localize_1 = __importDefault(require("./i18n/localize"));
const discord_js_1 = require("discord.js");
class TicTacToe {
    constructor(config) {
        this.config = config !== null && config !== void 0 ? config : {};
        this.eventHandler = new EventHandler_1.default();
        this.bot = new TicTacToeBot_1.default(this.config, this.eventHandler);
        localize_1.default.loadFromLocale(this.config.language);
    }
    login(token) {
        var _a;
        return __awaiter(this, void 0, void 0, function* () {
            const loginToken = token !== null && token !== void 0 ? token : this.config.token;
            if (!loginToken) {
                throw new Error('Bot token needed to start Discord client.');
            }
            else if (!this.config.command && !this.config.textCommand) {
                throw new Error('Game slash or text command needed to start Discord client.');
            }
            const client = new discord_js_1.Client({
                intents: [
                    discord_js_1.GatewayIntentBits.Guilds,
                    discord_js_1.GatewayIntentBits.GuildMessages,
                    discord_js_1.GatewayIntentBits.GuildMessageReactions,
                    ...(this.config.textCommand ? [discord_js_1.GatewayIntentBits.MessageContent] : [])
                ]
            });
            try {
                yield client.login(loginToken);
            }
            catch (e) {
                if ((_a = e.message) === null || _a === void 0 ? void 0 : _a.startsWith('Privileged')) {
                    throw new Error('You must enable Message Content intent to use the text command.');
                }
                else {
                    throw e;
                }
            }
            this.bot.attachToClient(client);
        });
    }
    attach(client) {
        this.bot.attachToClient(client);
    }
    handleMessage(message) {
        this.bot.handleMessage(message);
    }
    handleInteraction(interaction) {
        this.bot.handleInteraction(interaction);
    }
    on(eventName, listener) {
        this.eventHandler.registerListener(eventName, listener);
    }
}
module.exports = TicTacToe;
