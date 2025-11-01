import dayjs from "dayjs";
import duration from "dayjs/plugin/duration";
import timezone from "dayjs/plugin/timezone";
import utc from "dayjs/plugin/utc";

export type TimeUntilNextSpin = {
  hours: number;
  minutes: number;
  seconds: number;
  totalMilliseconds: number;
};

dayjs.extend(duration);
dayjs.extend(utc);
dayjs.extend(timezone);

interface SpinCheckResult {
  canSpin: boolean;
  timeUntilNextSpin?: TimeUntilNextSpin;
  nextSpinAt?: string;
}

export function canUserSpinRoulette(
  lastSpinAt: string | undefined | Date,
  userTimezone?: string
): SpinCheckResult {
  if (!lastSpinAt) {
    return { canSpin: true };
  }

  try {
    if (!userTimezone) {
      userTimezone = getUserTimezone();
    }
    const lastSpin = dayjs(lastSpinAt).tz(userTimezone);
    const now = dayjs().tz(userTimezone);
    const todayMidnight = now.startOf("day");
    const canSpin = lastSpin.isBefore(todayMidnight);
    if (canSpin) {
      return { canSpin: true };
    }
    const nextMidnight = now.add(1, "day").startOf("day");
    const timeDiff = nextMidnight.diff(now);
    const remainingDuration = dayjs.duration(timeDiff);
    return {
      canSpin: false,
      timeUntilNextSpin: {
        hours: Math.floor(remainingDuration.asHours()),
        minutes: remainingDuration.minutes(),
        seconds: remainingDuration.seconds(),
        totalMilliseconds: timeDiff,
      },
      nextSpinAt: nextMidnight.toISOString(),
    };
  } catch (error) {
    return { canSpin: true };
  }
}

export function getUserTimezone(): string {
  try {
    return Intl.DateTimeFormat().resolvedOptions().timeZone;
  } catch {
    return "UTC";
  }
}

export function isValidTimezone(timezone: string): boolean {
  try {
    dayjs().tz(timezone);
    return true;
  } catch {
    return false;
  }
}

export function getNow(date?: string, timezone?: string) {
  if (!timezone) {
    timezone = getUserTimezone();
  }
  if (!date) return dayjs().tz(timezone);
  return dayjs(date).tz(timezone);
}
