// This function will truncate a string if it exceeds a limit and add an ellipsis character if truncated
export function limitWithEllipsis(str, limit) {
  if (str.length > limit) {
    return str.slice(0, limit - 1) + '…';
  } else {
    return str;
  }
}
