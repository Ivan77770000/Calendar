import { useState, useCallback } from "react";
import { useSelector } from "react-redux";
import _ from "lodash";

import ErrorMessage from "../common/error-message";

const ConnectAPIHook = () => {
  const [connectStatus, setConnectStatus] = useState();
  const { user } = useSelector((state) => state.auth);

  const APIMethodType = {
    get: "GET",
    post: "POST",
    put: "PUT",
    delete: "DELETE",
  };

  const sendAPIRequest = useCallback(
    async (config, callback) => {
      setConnectStatus();

      const defaultHeader = {
        "content-type": "application/json; charset=utf-8",
      };

      if (user) {
        defaultHeader["authorization"] = `Bearer ${user.token}`;
      }

      try {
        const response = await fetch(config.url, {
          method: config.method ? config.method : APIMethodType.get,
          headers: config.headers ? config.headers : defaultHeader,
          body: config.body ? config.body : null,
        });

        if (!response.ok) {
          throw new Error(ErrorMessage.common.common);
        }

        const data = await response.json();
        callback.success(data);
        setConnectStatus("success");
      } catch (err) {
        callback.error(err);
        setConnectStatus("error");
      } finally {
        _.isFunction(callback.finally) && callback.finally();
        setConnectStatus("finally");
      }
    },
    [user, APIMethodType.get]
  );

  return { APIMethodType, sendAPIRequest, connectStatus };
};

export default ConnectAPIHook;
