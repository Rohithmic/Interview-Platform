import { useEffect, useState } from "react";
import { Call, useStreamVideoClient } from "@stream-io/video-react-sdk";

const useGetCallById = (id: string | string[]) => {
    const [call, setCall] = useState<Call>();
    const [isCallLoading, setIsCallLoading] = useState(true);

    const client = useStreamVideoClient();

    useEffect(() => {
        if (!client || !id) return;

        setIsCallLoading(true);
        const callObj = client.call("default", typeof id === "string" ? id : id[0]);
        setCall(callObj);
        setIsCallLoading(false);
    }, [client, id]);

    return { call, isCallLoading };
};

export default useGetCallById;