import { Component, OnInit, Input } from '@angular/core';
import { ModalService } from 'src/app/services/settings/modal.service';
import { UsuariosService } from '../../../services/generales/usuarios.service';
import { Usuario } from 'src/app/models/usuario.model';


@Component({
  selector: 'app-usuario-detalle',
  templateUrl: './usuario-detalle.component.html',
  styles: [
  ]
})
export class UsuarioDetalleComponent implements OnInit {
  @Input() usuario:Usuario;

  constructor(
    public _modalService:ModalService,
    public _usuarioService:UsuariosService
  ) {}

  ngOnInit(): void {
  }

  cerrarModal(){
    this._modalService.cerrarModal();
    this._modalService.notificarUpload.emit(false);
  }

}
