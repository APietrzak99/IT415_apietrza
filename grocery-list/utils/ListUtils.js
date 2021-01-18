import 'react-native-get-random-values';
import { v4 as uuidv4 } from "uuid";

export const newItem = (attrs = {}) => {
  const item = {
    item: attrs.item || 'Item',
    qty: attrs.qty || 'Qty',
    id: uuidv4(),
    isRunning: false,
  };

  return item;
};
