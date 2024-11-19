"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (k !== "default" && Object.prototype.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
    __setModuleDefault(result, mod);
    return result;
};
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose_1 = __importStar(require("mongoose"));
const constants_1 = require("../../../constants");
const ChatSchema = new mongoose_1.Schema({
    userName: {
        type: String,
        required: true,
    },
    message: {
        type: String,
        required: true,
    },
    location: {
        type: {
            type: String,
            enum: [constants_1.ENUM_LOCATION_TYPE.POINT],
            required: true,
        },
        coordinates: {
            type: [Number],
            required: true,
        },
    },
}, {
    timestamps: true
});
ChatSchema.index({ location: '2dsphere' });
ChatSchema.index({ createdAt: 1 }, { expireAfterSeconds: 3600 });
const ChatModel = mongoose_1.default.model('Chat', ChatSchema);
ChatModel.createIndexes();
exports.default = ChatModel;