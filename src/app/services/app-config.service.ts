import { Injectable } from '@angular/core';
import ConfigObject from 'src/assets/config.json';
import ProdConfigObject from 'src/assets/config.prod.json';
import { environment } from '../../environments/environment';
import { AppConfig } from '../models/app-config';

@Injectable({
  providedIn: 'root'
})
export class AppConfigService {
  get config(): AppConfig {
    return environment.production ? ProdConfigObject : ConfigObject;
  }
}
