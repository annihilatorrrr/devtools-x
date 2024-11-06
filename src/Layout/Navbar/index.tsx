import {
  ActionIcon,
  Box,
  Divider,
  Group,
  Select,
  Stack,
  Tooltip,
} from "@mantine/core";
import React, { useEffect, useMemo, useState } from "react";

import { IconHome, IconMenu2, IconX } from "@tabler/icons-react";

import { useLocation, useNavigate } from "react-router-dom";
import cx from "clsx";
import { navitems as data } from "./items";
import {
  AppConfigType,
  defaultConfig,
  useAppContext,
} from "../../Contexts/AppContextProvider";
import { db } from "@/utils";
import classes from "./styles.module.css";

import { useLocalStorage, useWindowEvent } from "@mantine/hooks";
import { trackButtonClick, trackOtherEvent } from "@/utils/analytics";
import { GroupedView } from "./components/GroupedView";
import { UngroupedView } from "./components/UngroupedView";

const Groups = [
  "Web",
  "Utilities",
  "Testing",
  "Password",
  "Image",
  "Generators",
  "Minifier/Formatters",
  "Previewers",
  "Converters",
  "Hashing",
] as const;

export type NavItem = {
  id: string;
  to: string;
  icon: React.ReactNode;
  text: string;
  group: (typeof Groups)[number];
  extra?: string;
};

export type DropDownItem = {
  group: (typeof Groups)[number];
  items: {
    label: string;
    value: string;
    icon: React.ReactNode;
    id: string;
  }[];
};

export { data };

export const Navbar = () => {
  const location = useLocation();
  const nav = useNavigate();
  const [navItems, setNavItems] = useState<NavItem[]>([]);
  const [groupedView] = useLocalStorage({
    key: "groupItems",
    defaultValue: true,
  });
  const { pinned, handleState, handleConfig } = useAppContext();
  const [iconMode, setIconMode] = useState(false);

  useEffect(() => {
    async function pinnedItems() {
      const pinnedStore = (await db.get<string[]>("pinned")) || [];

      handleState([...pinnedStore]);
    }
    pinnedItems();

    async function appConfig() {
      const config = (await db.get<AppConfigType>("config")) || defaultConfig;
      handleConfig(config);
    }
    appConfig();
  }, []);

  useEffect(() => {
    async function sidebar() {
      const savedSidebaritems = (await db.get<string[]>("sidebar")) || [];
      if (savedSidebaritems.length > 0) {
        if (savedSidebaritems.length !== data.length) {
          setNavItems([...data]);
          db.set("sidebar", []);
          return;
        }
        const newNavItems = savedSidebaritems.map((i) => {
          return data.find((d) => d.id === i)!;
        });

        setNavItems(newNavItems);
      } else {
        setNavItems([...data]);
      }
    }

    sidebar();
  }, []);

  useEffect(() => {
    // scroll to active item
    const active = document.querySelector(`.${classes.active}`);
    if (active) {
      active.scrollIntoView({ block: "center", behavior: "smooth" });
    }
  }, [classes.active, location.pathname, navItems]);

  const onPinClicked = async (item: any) => {
    // get existing pins from db
    const pinned = await db.get<string[]>("pinned");
    // if pin you cliked already exists in db, remove it.
    if (pinned?.includes(item.id)) {
      await db.set(
        "pinned",
        pinned.filter((i: string) => i !== item.id)
      );
    } else {
      // add existing to db
      let existing = (await db.get<string[]>("pinned")) || [];
      await db.set("pinned", [...existing, item.id]);
    }
    await db.save();
    const newPinned = await db.get<string[]>("pinned");
    handleState(newPinned as string[]);
  };

  const listener = (e: KeyboardEvent) => {
    if (e.ctrlKey && e.key === "b") {
      trackOtherEvent("shortcut", {
        key: "mod + b",
        action: "toggle-sidebar-collapse",
      });
      setIconMode(!iconMode);
    }
  };

  const dropDownItems: DropDownItem[] = useMemo(() => {
    const arr = [...Groups].map((i) => ({
      group: i,
      items: navItems
        .filter((n) => n.group === i)
        .map((n) => ({ label: n.text, value: n.to, icon: n.icon, id: n.id })),
    }));

    return arr;
  }, [navItems]);

  useWindowEvent("keydown", listener);

  return (
    <Stack
      className={classes.navbar}
      id="navbar"
      w={iconMode ? 50 : 250}
      align={iconMode ? "center" : undefined}
    >
      <Stack
        className={iconMode ? classes.iconsTopSection : classes.topSection}
      >
        <Group wrap="nowrap" align="end" gap={0} pr={10}>
          <ActionIcon
            onClick={() => nav("/")}
            display={iconMode ? "none" : "flex"}
          >
            <IconHome width={16} />
          </ActionIcon>
          <Select
            data={dropDownItems}
            // value={group}
            onChange={(value) => {
              if (value) {
                console.log(value);
                nav(`${value}`);
              }
            }}
            allowDeselect={false}
            searchable
            clearable
            placeholder="Search..."
            px="sm"
            size="xs"
            display={iconMode ? "none" : "block"}
            mt={15}
            width={""}
          />

          <ActionIcon
            variant={"filled"}
            onClick={() => {
              trackButtonClick({
                name: "toggle-icon-mode",
                value: !iconMode,
              });
              setIconMode(!iconMode);
            }}
          >
            {iconMode ? <IconMenu2 width={16} /> : <IconX width={16} />}
          </ActionIcon>
        </Group>
      </Stack>

      <Divider />
      {/* ====== One Title */}
      {!iconMode ? (
        groupedView ? (
          <GroupedView
            dropDownItems={dropDownItems}
            onPinClicked={onPinClicked}
            pinned={pinned}
          />
        ) : (
          <UngroupedView
            navItems={navItems}
            handleNavItems={(items) => setNavItems(items)}
            onPinClicked={onPinClicked}
            pinned={pinned}
          />
        )
      ) : (
        <Stack className={classes.iconsbarWrapper}>
          {navItems.map((e) => {
            return (
              <Tooltip label={e.text} key={e.id}>
                <Box
                  className={cx(classes.iconsBarRow, {
                    [classes.active]: location.pathname === e.to,
                  })}
                  onClick={() => nav(e.to)}
                >
                  {e.icon}
                </Box>
              </Tooltip>
            );
          })}
        </Stack>
      )}
    </Stack>
  );
};
