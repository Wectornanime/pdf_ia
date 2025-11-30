import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { Textarea } from "@heroui/input";
import { ScrollShadow } from "@heroui/scroll-shadow";
import { Card, CardBody } from "@heroui/card";
import { Button } from "@heroui/button";
import { Spinner } from "@heroui/spinner";
import ReactMarkdown from "react-markdown";
import {
  ArrowUpwardRounded as ArrowUpwardRoundedIcon,
  AttachFileRounded as AttachFileRoundedIcon,
} from "@mui/icons-material";

import { api } from "@/services/api";

export default function IndexPage() {
  const { id } = useParams();
  const navigate = useNavigate();

  const [userAsk, setUserAsk] = useState<string>("");
  const [isAnimatedChat, setIsAnimatedChat] = useState<boolean>(false);
  const [awaitingAnswer, setAwaitingAnswer] = useState<boolean>(false);
  const [messages, setMessages] = useState([
    // { id: 1, content: "Olá! Como posso ajudar?", role: "model" },
    // { id: 2, content: "Quero montar um layout de chat!", role: "user" },
    // { id: 3, content: "Claro! Aqui está uma versão completa!", role: "model" },
    // { id: 4, content: "Claro! Aqui está uma versão completa!", role: "model" },
    // { id: 5, content: "Claro! Aqui está uma versão completa!", role: "user" },
    // { id: 6, content: "Claro! Aqui está uma versão completa!", role: "model" },
    // { id: 7, content: "Claro! Como um modelo de linguagem, eu sou um pouco diferente de você, mas posso te contar o que sou:\n\n*   **Eu sou uma inteligência artificial:** Fui desenvolvido e treinado pelo Google.\n*   **Minha \"personalidade\" é neutra e auxiliar:** Não tenho sentimentos, opiniões pessoais, consciência, memórias ou experiências de vida como um ser humano. Meu objetivo é ser útil, informativo e criativo.\n*   **Minha função:** Processar e gerar linguagem humana para responder às suas perguntas, fornecer informações, criar textos, traduzir idiomas, resumir conteúdos e ajudar em uma variedade de tarefas baseadas em texto.\n*   **Eu não tenho um corpo, idade, nacionalidade ou gênero.** Não tenho um \"eu\" físico ou uma história pessoal no sentido humano.\n*   **Estou sempre aprendendo:** Através do meu treinamento contínuo, sou capaz de entender e gerar respostas cada vez mais precisas e relevantes.\n\nPense em mim como uma ferramenta avançada projetada para interagir com você através da linguagem e fornecer informações baseadas em um vasto conjunto de dados com os quais fui treinado.\n\nComo posso te ajudar hoje?", role: "model" },
  ]);

  const loadSession = async () => {
    if (id) {
      setAwaitingAnswer(true);
      const { data } = await api.get(`session/${id}`);

      setMessages(data);
      setAwaitingAnswer(false);
    }

    setIsAnimatedChat(true);
  };

  const sendAsk = async () => {
    if (!userAsk.trim()) return;

    const ask = userAsk;

    setUserAsk("");
    setAwaitingAnswer(true);

    if (!id) {
      setMessages((prev) => [
        ...prev,
        { id: prev.length + 1, content: ask, role: "user" },
      ]);

      const { data } = await api.post(`session`, { ask });

      setMessages((prev) => [
        ...prev,
        { id: prev.length + 1, content: data.answer, role: "model" },
      ]);

      navigate(`/${data.session_id}`);
    } else {
      setMessages((prev) => [
        ...prev,
        { id: prev.length + 1, content: ask, role: "user" },
      ]);

      const { data } = await api.post(`session/${id}/ask`, { ask });

      setMessages((prev) => [
        ...prev,
        { id: prev.length + 1, content: data.answer, role: "model" },
      ]);
    }

    setAwaitingAnswer(false);
  };

  useEffect(() => {
    loadSession();
  }, []);

  return (
    <main className="max-w-full h-full flex flex-col justify-between">
      <section className="w-7/8 mx-auto pb-20">
        <ScrollShadow className="flex flex-col gap-2 p-4">
          {messages.map((msg) => (
            <Card
              key={msg.id}
              className={`
                max-w-[60%]
                ${msg.role === "user" ? "ml-auto" : "mr-auto"}
                ${msg.role === "user" ? "bg-primary text-white" : ""}
                ${isAnimatedChat ? "fade-in" : ""}
              `}
            >
              <CardBody>
                <ReactMarkdown>{msg.content}</ReactMarkdown>
              </CardBody>
            </Card>
          ))}
          {awaitingAnswer ? <Spinner size="md" variant="dots" /> : <></>}
        </ScrollShadow>
      </section>

      <section className="fixed bottom-0 w-3/4 lg:w-5/8 flex justify-center py-4 border-t border-default-200">
        <Textarea
          className="w-3/4 lg:w-5/8"
          endContent={
            <div className="flex gap-1">
              {!id && (
                <Button
                  isIconOnly
                  color="default"
                  isDisabled={id ? true : false}
                  isLoading={awaitingAnswer}
                  size="lg"
                  variant="light"
                  onClickCapture={() => sendAsk()}
                >
                  <AttachFileRoundedIcon />
                </Button>
              )}
              <Button
                isIconOnly
                color="primary"
                isLoading={awaitingAnswer}
                size="lg"
                onClickCapture={() => sendAsk()}
              >
                <ArrowUpwardRoundedIcon />
              </Button>
            </div>
          }
          maxRows={4}
          minRows={2}
          placeholder="Digite sua mensagem..."
          size="lg"
          value={userAsk}
          onChange={(e) => setUserAsk(e.target.value)}
        />
      </section>
    </main>
  );
}
