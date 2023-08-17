import { Ng2SearchPipeModule } from 'ng2-search-filter';
import { NgxPaginationModule } from 'ngx-pagination';
import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';


import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HeaderComponent } from './layouts/header/header.component';
import { FooterComponent } from './layouts/footer/footer.component';
import { SidebarComponent } from './layouts/sidebar/sidebar.component';
import { DashboardComponent } from './pages/dashboard/dashboard.component';
import { ProgressComponent } from './components/progress/progress.component';
import { SpinnersComponent } from './components/spinners/spinners.component';
import { TooltipsComponent } from './components/tooltips/tooltips.component';
import { TablesGeneralComponent } from './components/tables-general/tables-general.component';
import { TablesDataComponent } from './components/tables-data/tables-data.component';
import { UsersProfileComponent } from './pages/users-profile/users-profile.component';
import { PagesFaqComponent } from './pages/pages-faq/pages-faq.component';
import { PagesContactComponent } from './pages/pages-contact/pages-contact.component';
import { PagesRegisterComponent } from './pages/pages-register/pages-register.component';
import { PagesLoginComponent } from './pages/pages-login/pages-login.component';
import { PagesError404Component } from './pages/pages-error404/pages-error404.component';
import { PagesBlankComponent } from './pages/pages-blank/pages-blank.component';
import { HTTP_INTERCEPTORS, HttpClientModule } from '@angular/common/http';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { AuthInterceptor } from './auth.interceptor';
import { NumberFormatPipe } from './pages/pipe/NumberFormatPipe';
import { PopupprojectComponent } from './popupproject/popupproject.component';
import { ProgrammeComponent } from './components/programme/programme.component';
import { ProjectComponent } from './components/project/project.component';
import { BudgetsComponent } from './components/budgets/budgets.component';
import { ConsulterComponent } from './consulter/consulter.component';
import { ProjetComponent } from './pages/projet/projet.component';
import { AlertsComponent } from './components/alerts/alerts.component';
import { AccordionComponent } from './components/accordion/accordion.component';
import { BadgesComponent } from './components/badges/badges.component';
import { BreadcrumbsComponent } from './components/breadcrumbs/breadcrumbs.component';
import { ButtonsComponent } from './components/buttons/buttons.component';
import { CardsComponent } from './components/cards/cards.component';
import { CarouselComponent } from './components/carousel/carousel.component';
import { ListGroupComponent } from './components/list-group/list-group.component';
import { ModalComponent } from './components/modal/modal.component';
import { TabsComponent } from './components/tabs/tabs.component';
import { PaginationComponent } from './components/pagination/pagination.component';
import { FormsElementsComponent } from './components/forms-elements/forms-elements.component';
import { FormsLayoutsComponent } from './components/forms-layouts/forms-layouts.component';
import { FormsEditorsComponent } from './components/forms-editors/forms-editors.component';
import { ChartsChartjsComponent } from './components/charts-chartjs/charts-chartjs.component';
import { ChartsApexchartsComponent } from './components/charts-apexcharts/charts-apexcharts.component';
import { IconsBootstrapComponent } from './components/icons-bootstrap/icons-bootstrap.component';
import { IconsRemixComponent } from './components/icons-remix/icons-remix.component';
import { IconsBoxiconsComponent } from './components/icons-boxicons/icons-boxicons.component';
import { AddMorassComponent } from './components/add-morass/add-morass.component';
import { EditMorassComponent } from './components/edit-morass/edit-morass.component';
import { AddDepartComponent } from './components/add-depart/add-depart.component';
import { EditDepartComponent } from './components/edit-depart/edit-depart.component';
import { AddOddComponent } from './components/add-odd/add-odd.component';
import { ListOddComponent } from './components/list-odd/list-odd.component';
import { SecondChartDataComponent } from './components/second-chart-data/second-chart-data.component';
import { ChartDataComponent } from './components/chart-data/chart-data.component';
import { ThirdChartDataComponent } from './components/third-chart-data/third-chart-data.component';
import { FourthChartDataComponent } from './components/fourth-chart-data/fourth-chart-data.component';
import { PopuppsolitionAdminComponent } from './components/popuppsolition-admin/popuppsolition-admin.component';
import { PopuppsolitionUserComponent } from './components/popuppsolition-user/popuppsolition-user.component';
import { MettreJourComponent } from './components/mettre-jour/mettre-jour.component';



@NgModule({
  declarations: [
    AppComponent,
    HeaderComponent,
    FooterComponent,
    SidebarComponent,
    DashboardComponent,
    AlertsComponent,
    AccordionComponent,
    BadgesComponent,
    BreadcrumbsComponent,
    ButtonsComponent,
    CardsComponent,
    CarouselComponent,
    ListGroupComponent,
    ModalComponent,
    TabsComponent,
    PaginationComponent,
    ProgressComponent,
    SpinnersComponent,
    TooltipsComponent,
    FormsElementsComponent,
    FormsLayoutsComponent,
    FormsEditorsComponent,
    TablesGeneralComponent,
    TablesDataComponent,
    ChartsChartjsComponent,
    ChartsApexchartsComponent,
    IconsBootstrapComponent,
    IconsRemixComponent,
    IconsBoxiconsComponent,
    UsersProfileComponent,
    PagesFaqComponent,
    PagesContactComponent,
    PagesRegisterComponent,
    PagesLoginComponent,
    PagesError404Component,
    PagesBlankComponent,
    AddMorassComponent,
    EditMorassComponent,
    AddDepartComponent,
    EditDepartComponent,
    AddOddComponent,
    ListOddComponent,
    SecondChartDataComponent,
    ChartDataComponent,
    ThirdChartDataComponent,
    FourthChartDataComponent,
    NumberFormatPipe,
    PopupprojectComponent,
    PopuppsolitionAdminComponent,
    PopuppsolitionUserComponent,
    MettreJourComponent,
    ProgrammeComponent,
    ProjectComponent,
    BudgetsComponent,
    ConsulterComponent,
    ProjetComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    FormsModule,

    ReactiveFormsModule,
    NgxPaginationModule,
    Ng2SearchPipeModule
  ],
  providers: [{ provide: HTTP_INTERCEPTORS, useClass: AuthInterceptor, multi: true },],
  bootstrap: [AppComponent
  ]
})
export class AppModule { }
