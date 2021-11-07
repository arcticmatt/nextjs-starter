import AmplitudeEvent from "src/types/enums/AmplitudeEvent";
import { Callback } from "amplitude-js";
import getAmplitude from "src/utils/amplitude/getAmplitude";
import { useRouter } from "next/dist/client/router";

export default function useLogEvent(): (
  event: AmplitudeEvent,
  data?: { [key: string]: any },
  callback?: Callback
) => void {
  const router = useRouter();

  return (event, data, callback) => {
    const amplitude = getAmplitude();
    amplitude.logEvent(
      event,
      {
        ...data,
        asPath: router.asPath,
        origin: window.self.origin,
        pathname: router.pathname,
        referrer: document.referrer,
      },
      callback
    );
  };
}
