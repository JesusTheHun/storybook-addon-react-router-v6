import React, {useEffect, useRef, useState} from "react";
import {AddonPanel} from "@storybook/components";
import {PanelContent, PanelContentProps} from "./components/PanelContent";
import {EVENTS} from "./constants";
import {addons} from '@storybook/addons';
import {STORY_CHANGED} from "@storybook/core-events";

interface PanelProps {
  active: boolean;
}

export const Panel: React.FC<PanelProps> = (props) => {
  const eventCount = useRef(0);
  const [navigationEvents, setNavigationEvents] = useState<PanelContentProps['navigationEvents']>([]);
  const channel = addons.getChannel();

  useEffect(() => {
    const stackEvent = (event: any) => setNavigationEvents(prev => [...prev, {...event, key: eventCount.current++ }]);
    const eventsToSubscribe = [
      EVENTS.STORY_LOADED,
      EVENTS.NAVIGATION,
      EVENTS.ROUTE_MATCHES,
      EVENTS.LOADER_INVOKED,
      EVENTS.LOADER_SETTLED,
      EVENTS.ACTION_INVOKED,
      EVENTS.ACTION_SETTLED,
      STORY_CHANGED,
    ]
    eventsToSubscribe.forEach(e => channel.addListener(e, stackEvent));

    return () => addons.getChannel().removeAllListeners();
  }, []);


  const clear = () => {
    channel.emit(EVENTS.CLEAR);
    setNavigationEvents([]);
  }

  return (
    <AddonPanel {...props}>
      <PanelContent navigationEvents={navigationEvents} onClear={clear} />
    </AddonPanel>
  );
};
