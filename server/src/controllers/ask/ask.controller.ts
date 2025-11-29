import { Request, Response } from 'express';
import { supabaseService } from '../../services/supabase.service';
import { geminiService } from '../../services/gemini.service';

export default class AskController {
  async handle(request: Request, response: Response) {
    try {
      const { sessionId, question } = request.body;

      if (!sessionId || !question) {
        return response.status(400).json({ error: 'sessionId e question obrigatórios' });
      }

      // pega sessão
      const { data: session, error: sessionErr } = await supabaseService
        .from('sessions')
        .select('*')
        .eq('id', sessionId)
        .single();

      if (sessionErr || !session) {
        return response.status(404).json({ error: 'Sessão não encontrada' });
      }

      // baixa PDF
      const { data: file } = await supabaseService.storage
        .from('ia-gemini_bucket')
        .download(session.pdf_path);

      const buffer = Buffer.from(await file!.arrayBuffer());
      const pdfBase64 = buffer.toString('base64');

      // pega histórico
      const { data: history } = await supabaseService
        .from('messages')
        .select('*')
        .eq('session_id', sessionId)
        .order('created_at', { ascending: true });

      const messages: any[] = [];

      // PDF sempre primeiro
      messages.push({
        fileData: {
          mimeType: 'application/pdf',
          data: pdfBase64,
        },
      });

      // histórico
      history?.forEach((msg) => {
        messages.push({
          text: `${msg.role.toUpperCase()}: ${msg.content}`,
        });
      });

      // pergunta atual
      messages.push({ text: 'USER: ' + question });

      const result = await geminiService.ask(messages);
      const answer = result.text;

      // salva pergunta
      await supabaseService.from('messages').insert({
        session_id: sessionId,
        role: 'user',
        content: question,
      });

      // salva resposta
      await supabaseService.from('messages').insert({
        session_id: sessionId,
        role: 'model',
        content: answer,
      });

      return response.json({ answer });
    } catch (err) {
      console.error(err);
      return response.status(500).json({ error: 'Erro ao gerar resposta' });
    }
  }
}
