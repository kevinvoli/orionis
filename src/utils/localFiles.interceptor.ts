import { MulterOptions } from "@nestjs/platform-express/multer/interfaces/multer-options.interface";

interface LocalFilesInterceptorOption{
  
  fieldName: string;
  path?: string;
  fileFilter?: MulterOptions['fileFilter'];
  limits?: MulterOptions['limits'];

} 