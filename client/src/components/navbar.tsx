import { useEffect, useState } from "react";
import { Link } from "@heroui/link";
import {
  Navbar as HeroUINavbar,
  NavbarBrand,
  NavbarContent,
  NavbarItem,
} from "@heroui/navbar";
import {
  Drawer,
  DrawerContent,
  DrawerHeader,
  DrawerBody,
} from "@heroui/drawer";
import { Card, CardBody, Spinner, useDisclosure } from "@heroui/react";
import { Button } from "@heroui/button";
import { MenuOpenRounded as MenuOpenRoundedIcon } from "@mui/icons-material";

import { siteConfig } from "@/config/site";
import { ThemeSwitch } from "@/components/theme-switch";
import { GithubIcon } from "@/components/icons";
import { api } from "@/services/api";

export const Navbar = () => {
  const [sessions, setSessions] = useState([]);
  const [isLoadingSessions, setIsLoadingSessions] = useState<boolean>(true);

  const { isOpen, onOpen, onOpenChange } = useDisclosure();

  const getSessions = async () => {
    setIsLoadingSessions(true);
    const { data } = await api.get("/session");

    setSessions(data);
    setIsLoadingSessions(false);
  };

  useEffect(() => {
    getSessions();
  }, []);

  return (
    <HeroUINavbar maxWidth="xl" position="sticky">
      <NavbarContent className="basis-1/5 sm:basis-full" justify="start">
        <NavbarBrand className="gap-3 max-w-fit">
          <Button isIconOnly variant="light" onPress={onOpen}>
            <MenuOpenRoundedIcon />
          </Button>
          <Drawer
            isOpen={isOpen}
            placement="left"
            size="xs"
            onOpenChange={onOpenChange}
          >
            {isLoadingSessions ? (
              <Spinner size="md" variant="dots" />
            ) : (
              <DrawerContent>
                {(onClose) => (
                  <>
                    <DrawerHeader className="flex flex-col gap-1">
                      Suas Seções:
                    </DrawerHeader>
                    <DrawerBody>
                      <Card key="0">
                        <CardBody>
                          <Link
                            href="/"
                            size="sm"
                            title="Nova seção"
                            onClick={onClose}
                          >
                            <p>Criar uma nova seção</p>
                          </Link>
                        </CardBody>
                      </Card>
                      {sessions.map((session) => (
                        <Card key={session.session_id}>
                          <CardBody>
                            <Link
                              href={session.session_id}
                              size="sm"
                              title={session.title}
                              onClick={onClose}
                            >
                              {session.title}
                            </Link>
                          </CardBody>
                        </Card>
                      ))}
                    </DrawerBody>
                  </>
                )}
              </DrawerContent>
            )}
          </Drawer>
        </NavbarBrand>
      </NavbarContent>

      <NavbarContent className="flex basis-1/5 sm:basis-full" justify="end">
        <NavbarItem className="flex gap-2 basis-1 pl-4">
          <Link isExternal href={siteConfig.links.github} title="GitHub">
            <GithubIcon className="text-default-500" />
          </Link>
          <ThemeSwitch />
        </NavbarItem>
      </NavbarContent>
    </HeroUINavbar>
  );
};
