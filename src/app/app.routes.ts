import { Routes } from '@angular/router';
import { UsuarioComponent } from './components/usuario/usuario.component';
import { RolComponent } from './components/rol/rol.component';
import { RolRegistrarComponent } from './components/rol/rol-registrar/rol-registrar.component';
import { EventosComponent } from './components/eventos/eventos.component';
import { EventosRegistrarComponent } from './components/eventos/eventos-registrar/eventos-registrar.component';
import { UsuariorutinaComponent } from './components/usuariorutina/usuariorutina.component';
import { UsuariorutinaRegistrarComponent } from './components/usuariorutina/usuariorutina-registrar/usuariorutina-registrar.component';
import { LoginComponent } from './components/login/login.component';
import { seguridadGuard } from './guard/seguridad.guard';
import { HomeComponent } from './components/home/home.component';
import { ImagenesgatosComponent } from './components/imagenesgatos/imagenesgatos.component';
import { ForoComponent } from './components/foro/foro.component';
import { ForoRegistrarComponent } from './components/foro/foro-registrar/foro-registrar.component';
import { MensajeforoComponent } from './components/mensajeforo/mensajeforo.component';
import { MensajeforoRegistrarComponent } from './components/mensajeforo/mensajeforo-registrar/mensajeforo-registrar.component';
import { TecnicarelajacionRegistrarComponent } from './components/tecnicarelajacion/tecnicarelajacion-registrar/tecnicarelajacion-registrar.component';
import { TecnicarelajacionComponent } from './components/tecnicarelajacion/tecnicarelajacion.component';
import { RutinaComponent } from './components/rutina/rutina.component';
import { RutinaRegistrarComponent } from './components/rutina/rutina-registrar/rutina-registrar.component';
import { EjerciciorutinaComponent } from './components/ejerciciorutina/ejerciciorutina.component';
import { EjerciciorutinaRegistrarComponent } from './components/ejerciciorutina/ejerciciorutina-registrar/ejerciciorutina-registrar.component';
import { PlanesmembresiaComponent } from './components/planesmembresia/planesmembresia.component';
import { PlanesmembresiaRegistrarComponent } from './components/planesmembresia/planesmembresia-registrar/planesmembresia-registrar.component';
import { SuscripcionComponent } from './components/suscripcion/suscripcion.component';
import { SuscripcionRegistrarComponent } from './components/suscripcion/suscripcion-registrar/suscripcion-registrar.component';
import { MetodopagoComponent } from './components/metodopago/metodopago.component';
import { MetodopagoRegistrarComponent } from './components/metodopago/metodopago-registrar/metodopago-registrar.component';
import { EmergenciaComponent } from './components/emergencia/emergencia.component';
import { EmergenciaRegistrarComponent } from './components/emergencia/emergencia-registrar/emergencia-registrar.component';
import { ReporteComponent } from './components/reporte/reporte.component';
import { ReporteTotalSuscripcionesComponent } from './components/reporte/reporte-total-suscripciones/reporte-total-suscripciones.component';
import { ReporteTotalForosComponent } from './components/reporte/reporte-total-foros/reporte-total-foros.component';
import { ReporteTotalMensajesComponent } from './components/reporte/reporte-total-mensajes/reporte-total-mensajes.component';
import { ReporteConfirmaronComponent } from './components/reporte/reporte-confirmaron/reporte-confirmaron.component';
import { UsuarioRegistrarComponent } from './components/usuario/usuario-registrar/usuario-registrar.component';
import { ReporteProgresoComponent } from './components/reporte/reporte-progreso/reporte-progreso.component';
import { ReporteemergenciaComponent } from './components/reporte/reporteemergencia/reporteemergencia.component';
import { ReporteTotalIngresosComponent } from './components/reporte/reporte-total-ingresos/reporte-total-ingresos.component';
import { ReporterutinaComponent } from './components/reporte/reporterutina/reporterutina.component';

export const routes: Routes = [
  {
    path: '',
    redirectTo: 'login',
    pathMatch: 'full',
  },
  {
    path: 'login',
    component: LoginComponent,
  },
  {
    path: 'usuarios',
    component: UsuarioComponent,
    children: [
      { path: 'nuevo', component: UsuarioRegistrarComponent },
      { path: 'ediciones/:id', component: UsuarioRegistrarComponent },
    ],
    canActivate: [seguridadGuard],
  },
  {
    path: 'rol',
    component: RolComponent,
    children: [
      { path: 'nuevo', component: RolRegistrarComponent },
      { path: 'ediciones/:id', component: RolRegistrarComponent },
    ],
    canActivate: [seguridadGuard],
  },
  {
    path: 'eventos',
    component: EventosComponent,
    children: [
      { path: 'nuevo', component: EventosRegistrarComponent },
      { path: 'ediciones/:id', component: EventosRegistrarComponent },
    ],
    canActivate: [seguridadGuard],
  },
  {
    path: 'UsuarioRutina',
    component: UsuariorutinaComponent,
    children: [
      { path: 'nuevo', component: UsuariorutinaRegistrarComponent },
      { path: 'ediciones/:id', component: UsuariorutinaRegistrarComponent },
    ],
    canActivate: [seguridadGuard],
  },
  {
    path: 'homes',
    component: HomeComponent,
    canActivate: [seguridadGuard],
  },
  {
    path: 'gatos',
    component: ImagenesgatosComponent,
    canActivate: [seguridadGuard],
  },
  {
    path: 'foross',
    component: ForoComponent,
    children: [
      { path: 'nuevo', component: ForoRegistrarComponent },
      { path: 'ediciones/:id', component: ForoRegistrarComponent },
    ],
    canActivate: [seguridadGuard],
  },
  {
    path: 'mensajeforos',
    component: MensajeforoComponent,
    children: [
      { path: 'nuevo', component: MensajeforoRegistrarComponent },
      { path: 'ediciones/:id', component: MensajeforoRegistrarComponent },
    ],
    canActivate: [seguridadGuard],
  },
  {
    path: 'rutina',
    component: RutinaComponent,
    children: [
      { path: 'nuevo', component: RutinaRegistrarComponent },
      { path: 'ediciones/:id', component: RutinaRegistrarComponent },
    ],
    canActivate: [seguridadGuard],
  },
  {
    path: 'ejerciciorutinas',
    component: EjerciciorutinaComponent,
    children: [
      { path: 'nuevo', component: EjerciciorutinaRegistrarComponent },
      { path: 'ediciones/:id', component: EjerciciorutinaRegistrarComponent },
    ],
    canActivate: [seguridadGuard],
  },
  {
    path: 'tecnicasrelajacion',
    component: TecnicarelajacionComponent,
    children: [
      { path: 'nuevo', component: TecnicarelajacionRegistrarComponent },
      { path: 'ediciones/:id', component: TecnicarelajacionRegistrarComponent },
    ],
    canActivate: [seguridadGuard],
  },
  {
    path: 'emergencias',
    component: EmergenciaComponent,
    children: [
      { path: 'nuevo', component: EmergenciaRegistrarComponent },
      { path: 'ediciones/:id', component: EmergenciaRegistrarComponent },
    ],
    canActivate: [seguridadGuard],
  },
    {
        path: 'planes', component:PlanesmembresiaComponent,
        children:[
            {path: 'nuevo',component:PlanesmembresiaRegistrarComponent},
            {path:'ediciones/:id',component:PlanesmembresiaRegistrarComponent}
        ]
    },
  {
    path: 'suscripciones',
    component: SuscripcionComponent,
    children: [
      { path: 'nuevo', component: SuscripcionRegistrarComponent },
      { path: 'ediciones/:id', component: SuscripcionRegistrarComponent },
    ],
    canActivate: [seguridadGuard],
  },
  {
    path: 'metodos',
    component: MetodopagoComponent,
    children: [
      { path: 'nuevo', component: MetodopagoRegistrarComponent },
      { path: 'ediciones/:id', component: MetodopagoRegistrarComponent },
    ],
    canActivate: [seguridadGuard],
  },
  {
    path: 'reportes',
    component: ReporteComponent,
    children: [
      { path: 'reporte-confirmaron', component: ReporteConfirmaronComponent },
      { path: 'reporte-progreso', component: ReporteProgresoComponent },
      { path: 'Forosporusuario', component: ReporteTotalForosComponent },
      { path: 'totalingresos', component: ReporteTotalIngresosComponent },
      { path: 'Mensajeporforo', component: ReporteTotalMensajesComponent },
      { path: 'suscripciones', component: ReporteTotalSuscripcionesComponent },
      { path: 'emergencias', component: ReporteemergenciaComponent },
    ],
    canActivate: [seguridadGuard],
  },
];
