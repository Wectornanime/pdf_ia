import { Request, Response } from 'express';
import fs from 'fs';
import { supabaseService } from '../../services/supabase.service';

export default class UploadController {
  async handle(request: Request, response: Response) {
    try {
      if (!request.file) {
        return response.status(400).json({ error: 'PDF obrigatório' });
      };

      const pdfBuffer = fs.readFileSync(request.file.path);
      const fileName = `pdf_${Date.now()}.pdf`;

      const { error: storageError } = await supabaseService.storage
        .from('ia-gemini_bucket')
        .upload(fileName, pdfBuffer, {
          contentType: 'application/pdf',
        });

      if (storageError) throw storageError;

      const { data, error } = await supabaseService
        .from('sessions')
        .insert({ pdf_path: fileName })
        .select()
        .single();

      fs.unlinkSync(request.file.path);

      if (error) throw error;

      response.status(200).send(data);

    } catch (error) {
      console.error(error);
      return response.status(500).json({ error: 'Erro ao criar sessão' });
    }
  }
}
