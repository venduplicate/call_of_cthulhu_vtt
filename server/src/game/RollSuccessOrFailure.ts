const successMessages = {
  regular: "regular",
  half: "hard",
  fifth: "extreme",
};

const failureMessages = {
  fumble: "fumble",
  fail: "fail"
}

function isFumble(rolled: number, regular: number){
  if (rolled >= 96 && rolled <= 100 && regular < 50){
    return true
  }
  if (rolled == 100 && regular >= 50){
    return true
  }
  else {
    return false;
  }
}

function isFailure(rolled: number, regular: number){
  return rolled > regular;
}



export function determineSuccessOrFailure(
  rolled: number,
  regular: number,
  half: number,
  fifth: number
) {
  switch (true) {
    case rolled <= fifth:
      return successMessages.fifth;
    case rolled <= half:
      return successMessages.half;
    case rolled <= regular:
      return successMessages.regular;
    case isFumble(rolled,regular):
      return failureMessages.fumble
    case isFailure(rolled, regular):
      return failureMessages.fail    
    default:
      throw new Error("Could not calculate success or failure chance");
  }
}
