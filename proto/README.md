# Protocol Buffers

This directory contains [ProtoBuf](https://protobuf.dev) definitions for all events recognized as messages within the
platform's scope.

### Q: How to compile contained files?

A: By using the protocol buffer compiler that can be obtained from
the [official release page](https://github.com/protocolbuffers/protobuf/releases).

### Q: How to delete parts of a message?

A: You should only remove optional fields from a message to keep backward compatibility. In such a case it's best
practice to [reserve](https://protobuf.dev/programming-guides/editions/#fieldreserved) number AND name of any deleted
field. Without doing so numbers and names could potentially be reused which may lead to data corruption.