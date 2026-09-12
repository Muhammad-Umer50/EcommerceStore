export interface Suggestioninterface {
  id: number;
  name: string;
  description: string;
  price: number;
}

interface AutoCompleteCompleteEvent {
  originalEvent: Event;
  query: string;
}
