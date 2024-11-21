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
Object.defineProperty(exports, "__esModule", { value: true });
exports.ChatDataBase = void 0;
const constants_1 = require("../../../constants");
class ChatDataBase {
    constructor(model) {
        this.model = model;
    }
    new(params) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const chat = Object.assign(Object.assign({}, params), { location: { type: constants_1.ENUM_LOCATION_TYPE.POINT, coordinates: params.location.coordinates } });
                yield this.model.create(chat);
            }
            catch (error) {
                throw new Error("new - dataBase error");
            }
        });
    }
    getByCoordinates(params) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const earthRadiusInKm = 6378.1;
                const radiusInRadians = params.radiusInKm / earthRadiusInKm;
                try {
                    const chats = (yield this.model.find({
                        location: {
                            $geoWithin: {
                                $centerSphere: [[params.lat, params.long], radiusInRadians],
                            },
                        },
                    }).sort({ _id: -1 })).map(chat => chat.toObject());
                    return chats;
                }
                catch (error) {
                    throw new Error(error.message);
                }
            }
            catch (error) {
                throw new Error(`getByCoordinates - dataBase error - ${error.message}`);
            }
        });
    }
}
exports.ChatDataBase = ChatDataBase;
