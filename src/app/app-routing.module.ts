
import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { DashboardComponent } from './pages/dashboard/dashboard.component';

import { ProgressComponent } from './components/progress/progress.component';
import { SpinnersComponent } from './components/spinners/spinners.component';
import { TablesDataComponent } from './components/tables-data/tables-data.component';
import { TablesGeneralComponent } from './components/tables-general/tables-general.component';
import { TabsComponent } from './components/tabs/tabs.component';
import { TooltipsComponent } from './components/tooltips/tooltips.component';
import { PagesBlankComponent } from './pages/pages-blank/pages-blank.component';
import { PagesContactComponent } from './pages/pages-contact/pages-contact.component';
import { PagesError404Component } from './pages/pages-error404/pages-error404.component';
import { PagesFaqComponent } from './pages/pages-faq/pages-faq.component';
import { PagesLoginComponent } from './pages/pages-login/pages-login.component';
import { PagesRegisterComponent } from './pages/pages-register/pages-register.component';
import { UsersProfileComponent } from './pages/users-profile/users-profile.component';
import { AuthGuard } from './auth.guard';
import { MettreJourComponent } from './components/mettre-jour/mettre-jour.component';
import { ConsulterComponent } from './consulter/consulter.component';
import { AddMorassComponent } from './components/add-morass/add-morass.component';
import { EditMorassComponent } from './components/edit-morass/edit-morass.component';
import { AddDepartComponent } from './components/add-depart/add-depart.component';
import { EditDepartComponent } from './components/edit-depart/edit-depart.component';
import { ListOddComponent } from './components/list-odd/list-odd.component';
import { AddOddComponent } from './components/add-odd/add-odd.component';
import { AlertsComponent } from './components/alerts/alerts.component';
import { AccordionComponent } from './components/accordion/accordion.component';
import { BadgesComponent } from './components/badges/badges.component';
import { BreadcrumbsComponent } from './components/breadcrumbs/breadcrumbs.component';
import { ButtonsComponent } from './components/buttons/buttons.component';
import { CardsComponent } from './components/cards/cards.component';
import { CarouselComponent } from './components/carousel/carousel.component';
import { ChartsApexchartsComponent } from './components/charts-apexcharts/charts-apexcharts.component';
import { ChartsChartjsComponent } from './components/charts-chartjs/charts-chartjs.component';
import { FormsEditorsComponent } from './components/forms-editors/forms-editors.component';
import { FormsElementsComponent } from './components/forms-elements/forms-elements.component';
import { FormsLayoutsComponent } from './components/forms-layouts/forms-layouts.component';
import { IconsBootstrapComponent } from './components/icons-bootstrap/icons-bootstrap.component';
import { IconsBoxiconsComponent } from './components/icons-boxicons/icons-boxicons.component';
import { IconsRemixComponent } from './components/icons-remix/icons-remix.component';
import { ListGroupComponent } from './components/list-group/list-group.component';
import { ModalComponent } from './components/modal/modal.component';
import { PaginationComponent } from './components/pagination/pagination.component';
import { ProjetComponent } from './pages/projet/projet.component';
import { ProjectComponent } from './components/project/project.component';
import { BudgetsComponent } from './components/budgets/budgets.component';

const routes: Routes = [
  // { path: '', component: DashboardComponent ,canActivate: [AuthGuard]},
  { path: '', pathMatch: 'full', redirectTo: '/pages-login' }, // Redirect to login page if the path is empty
  { path: 'dashboard', component: DashboardComponent, canActivate: [AuthGuard] },
  { path: 'alerts', component: AlertsComponent },
  { path: 'accordion', component: AccordionComponent },
  { path: 'badges', component: BadgesComponent },
  { path: 'breadcrumbs', component: BreadcrumbsComponent },
  { path: 'buttons', component: ButtonsComponent },
  { path: 'cards', component: CardsComponent },
  { path: 'carousel', component: CarouselComponent },
  { path: 'charts-apexcharts', component: ChartsApexchartsComponent },
  { path: 'charts-chartjs', component: ChartsChartjsComponent },
  { path: 'form-editors', component: FormsEditorsComponent },
  { path: 'form-elements', component: FormsElementsComponent },
  { path: 'form-layouts', component: FormsLayoutsComponent },
  { path: 'icons-bootstrap', component: IconsBootstrapComponent },
  { path: 'icons-boxicons', component: IconsBoxiconsComponent },
  { path: 'icons-remix', component: IconsRemixComponent },
  { path: 'etq-odd', component: ListGroupComponent },
  { path: 'modal', component: ModalComponent },
  { path: 'pagination', component: PaginationComponent },
  { path: 'progress', component: ProgressComponent },
  { path: 'spinners', component: SpinnersComponent },
  // { path: 'tables-data', component: TablesDataComponent,canActivate: [AuthGuard] },
  { path: 'tables-general', component: TablesGeneralComponent ,canActivate: [AuthGuard]},
  { path: 'tabs', component: TabsComponent },
  { path: 'tooltips', component: TooltipsComponent },
  { path: 'pages-blank', component: PagesBlankComponent },
  { path: 'pages-contact', component: PagesContactComponent },
  { path: 'pages-error404', component: PagesError404Component },
  { path: 'pages-faq', component: PagesFaqComponent },
  { path: 'pages-login', component: PagesLoginComponent },
  { path: 'pages-register', component: PagesRegisterComponent },
  { path: 'user-profile', component: UsersProfileComponent },
  { path: 'add-morass', component: AddMorassComponent ,canActivate: [AuthGuard]},
  { path: 'edit-morass/:id', component: EditMorassComponent ,canActivate: [AuthGuard]},
  { path: 'add-depart', component: AddDepartComponent ,canActivate: [AuthGuard]},
  { path: 'edit-depart/:id', component: EditDepartComponent ,canActivate: [AuthGuard]},
  { path: 'list-odd', component: ListOddComponent,canActivate: [AuthGuard] },
  { path: 'add-odd', component: AddOddComponent,canActivate: [AuthGuard] },
  { path: 'mettre_jour', component: MettreJourComponent,canActivate: [AuthGuard] },
  { path: 'consulter', component: ConsulterComponent,canActivate: [AuthGuard] },
  {
    path: 'tables-data',
    component: TablesDataComponent,
    canActivate: [AuthGuard],
    children: [
      { path: 'project', component: ProjectComponent, canActivate: [AuthGuard] },
      { path: 'budgets', component: BudgetsComponent, canActivate: [AuthGuard] },
      { path: 'budget/:id', component: BudgetsComponent, canActivate: [AuthGuard] },
    ]
  },

  // _____ la page projet
  // { path: 'project', component: ProjectComponent,canActivate: [AuthGuard] },
  // { path: 'Budgets', component: BudgetsComponent,canActivate: [AuthGuard] },
  { path: 'consulter-projet', component: ProjetComponent,canActivate: [AuthGuard] },




];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
