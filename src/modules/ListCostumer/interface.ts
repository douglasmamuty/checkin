import { ICostumer } from "../../context/interface";

export interface IListItem {
  item: ICostumer;
  handleActionMoreInfo: (obj: ICostumer) => void;
  handleActionRemove: (obj: ICostumer) => void;
}
