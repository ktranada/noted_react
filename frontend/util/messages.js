
const nextLogic = (count, reverse) => index => (
  reverse ? index >= 0 : index <= count
)

const timeOffsetLogic = reverse => (nextMessageOffset, currentTimeOffset) => {
  const offset = reverse
    ? nextMessageOffset - currentTimeOffset
    : currentTimeOffset - nextMessageOffset;
  return offset > 5
}

export default function messagesByDate(messages, reverse = false) {
  if (messages.length === 0) return null;

  const result = {
    order: []
  }
  let skipCount = 0;

  const count = messages.length;
  let index = reverse ? count - 1 : 0;
  const next = nextLogic(count, reverse);
  const isOutOufBounds = timeOffsetLogic(reverse);
  const incrementValue = reverse ? -1 : 1;

  for (; next(index); index += incrementValue) {
    const message = messages[index];

    if (skipCount > 0) {
      skipCount -= 1;
      continue;
    }

    if (message === undefined) {
      continue;
    }

    const date = message.date
    let nextIndex = index + incrementValue;
    let userMessages = [message]

    while (next(nextIndex)) {
      let nextMessage = messages[nextIndex];
      if (!nextMessage && nextIndex !== (reverse ? 0 : count - 1)) {
        nextIndex += incrementValue;
        skipCount += 1;
        continue;
      } else if (
        nextMessage.date !== date
        || nextMessage.author_id !== message.author_id
        || isOutOufBounds(nextMessage.time_offset, message.time_offset)) {
        break;
      }
      userMessages.push(nextMessage);
      nextIndex += incrementValue;
      skipCount += 1;
    }

    if (result[message.date]) {
      result[message.date].push(userMessages);
    } else {
      result.order.push(message.date);
      result[message.date] = [userMessages];
    }
  }
  return result
}
