import {Offer} from "@/types/offers";
import axios from "axios";

export const loadOffers = (): Promise<Offer[]> => axios<Offer[]>("offers").then((response) => response.data);
