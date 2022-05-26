// import {
//   FacebookMessageCreatedEvent,
//   Publisher,
//   Subjects,
// } from "@kurreyyh/common";
//
// export class FacebookMessageCreatedPublisher extends Publisher<FacebookMessageCreatedEvent> {
//   readonly subject = Subjects.FacebookMessageCreated;
// }

import {
  FacebookMessageCreatedEvent,
  Publisher,
  Subjects,
} from "@kursat38tr/common";

export class FacebookMessageCreatedPublisher extends Publisher<FacebookMessageCreatedEvent> {
  readonly subject = Subjects.FacebookMessageCreated;
}
