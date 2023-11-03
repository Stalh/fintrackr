import {
  Controller,
  Get,
  Post,
  Body,
  Param,
  Put,
  Delete,
} from '@nestjs/common';
import { UserService } from './user.service';
import { CreateUserDto } from './dto/create-user';
import { UserEntity } from './entities/user.entity';
import { Observable } from 'rxjs';
import { CreateExpenseDto } from './dto/create-expense';
import { UpdateUserDto } from './dto/update-user';
import { UpdateExpenseDto } from './dto/update-depense';
import { Public, IS_PUBLIC_KEY } from 'src/auth/decorator/public.decorator';
import { Expense } from './schemas/expense';
import { ApiTags, ApiOperation, ApiParam, ApiResponse, ApiBody } from '@nestjs/swagger';

@ApiTags('users')
@Controller('users')
export class UserController {
  constructor(private readonly userService: UserService) { }

  @Public()
  @Get(':username')
  @ApiOperation({ summary: 'Récupère un utilisateur par son nom d\'utilisateur' })
  @ApiParam({ name: 'username', description: 'Nom d\'utilisateur pour la recherche' })
  @ApiResponse({ status: 200, description: 'Utilisateur trouvé', type: UserEntity })
  @ApiResponse({ status: 404, description: 'Utilisateur non trouvé' })
  async getUserByUsername(@Param('username') username: string): Promise<UserEntity> {
    return this.userService.findByUsername(username);
  }

  @Get()
  @ApiOperation({ summary: 'Récupère tous les utilisateurs' })
  @ApiResponse({ status: 200, description: 'Liste des utilisateurs', type: [UserEntity] })
  findAll(): Observable<UserEntity[]> {
    return this.userService.findAll();
  }

  @Get(':id')
  @ApiOperation({ summary: 'Récupère un utilisateur par ID' })
  @ApiParam({ name: 'id', description: 'Identifiant de l\'utilisateur pour la recherche' })
  @ApiResponse({ status: 200, description: 'Utilisateur trouvé', type: UserEntity })
  @ApiResponse({ status: 404, description: 'Utilisateur non trouvé' })
  findOne(@Param('id') id: string): Observable<UserEntity> {
    return this.userService.findOne(id);
  }

  @Public()
  @Post()
  @ApiOperation({ summary: 'Crée un nouvel utilisateur' })
  @ApiBody({ description: 'Données de l\'utilisateur', type: CreateUserDto })
  @ApiResponse({ status: 201, description: 'Utilisateur créé', type: UserEntity })
  create(@Body() createUserDto: CreateUserDto): Observable<UserEntity> {
    return this.userService.create(createUserDto);
  }

  @Post(':id/add_expense')
  @ApiOperation({ summary: 'Ajoute une dépense à un utilisateur' })
  @ApiParam({ name: 'id', description: 'Identifiant de l\'utilisateur' })
  @ApiBody({ description: 'Données de la dépense', type: CreateExpenseDto })
  @ApiResponse({ status: 201, description: 'Dépense ajoutée à l\'utilisateur', type: UserEntity })
  addExpense(
    @Param('id') userId: string,
    @Body() expenseDto: CreateExpenseDto,
  ): Observable<UserEntity> {
    return this.userService.addExpense(userId, expenseDto);
  }

  @Put(':id')
  @ApiOperation({ summary: 'Met à jour un utilisateur' })
  @ApiParam({ name: 'id', description: 'Identifiant de l\'utilisateur' })
  @ApiBody({ description: 'Données mises à jour de l\'utilisateur', type: UpdateUserDto })
  @ApiResponse({ status: 200, description: 'Utilisateur mis à jour', type: UserEntity })
  updateUser(
    @Param('id') userId: string,
    @Body() updatedUserDto: UpdateUserDto,
  ): Promise<UserEntity> {
    return this.userService.updateUser(userId, updatedUserDto);
  }

  @Put(':idUser/update_expense/:idExpense')
  @ApiOperation({ summary: 'Met à jour la dépense d\'un utilisateur' })
  @ApiParam({ name: 'idUser', description: 'Identifiant de l\'utilisateur' })
  @ApiParam({ name: 'idExpense', description: 'Identifiant de la dépense' })
  @ApiBody({ description: 'Données mises à jour de la dépense', type: UpdateExpenseDto })
  @ApiResponse({ status: 200, description: 'Dépense mise à jour' })
  @ApiResponse({ status: 404, description: 'Dépense non trouvée' })
  updateUserExpense(
    @Param('idUser') userId: string,
    @Param('idExpense') expenseId: string,
    @Body() updatedExpenseDto: UpdateExpenseDto,
  ): Promise<void> {
    return this.userService.updateUserExpense(userId, expenseId, updatedExpenseDto);
  }

  @Delete(':idUser/delete_expense/:idExpense')
  @ApiOperation({ summary: 'Supprime la dépense d\'un utilisateur' })
  @ApiParam({ name: 'idUser', description: 'Identifiant de l\'utilisateur' })
  @ApiParam({ name: 'idExpense', description: 'Identifiant de la dépense' })
  @ApiResponse({ status: 200, description: 'Dépense supprimée' })
  @ApiResponse({ status: 404, description: 'Dépense non trouvée' })
  deleteUserExpense(
    @Param('idUser') userId: string,
    @Param('idExpense') expenseId: string,
  ): Promise<void> {
    return this.userService.deleteUserExpense(userId, expenseId);
  }

  @Get(':userId/expenses/:year/:month')
  @ApiOperation({ summary: 'Récupère les dépenses d\'un utilisateur pour un mois spécifique' })
  @ApiParam({ name: 'userId', description: 'Identifiant de l\'utilisateur' })
  @ApiParam({ name: 'year', description: 'Année de la dépense', type: Number })
  @ApiParam({ name: 'month', description: 'Mois de la dépense', type: Number })
  @ApiResponse({ status: 200, description: 'Liste des dépenses pour le mois spécifié', type: [Expense] })
  getUserExpensesByMonth(
    @Param('userId') userId: string,
    @Param('year') year: number,
    @Param('month') month: number,
  ): Promise<Expense[]> {
    return this.userService.getUserExpensesByMonth(userId, year, month);
  }

  @Put(':id/add_balance')
  @ApiOperation({ summary: 'Ajoute un solde à l\'utilisateur' })
  @ApiParam({ name: 'id', description: 'Identifiant de l\'utilisateur' })
  @ApiBody({ description: 'Montant à ajouter', type: Number })
  @ApiResponse({ status: 200, description: 'Solde ajouté à l\'utilisateur', type: UserEntity })
  addBalance(
    @Param('id') userId: string,
    @Body('amount') amount: number,
  ): Promise<UserEntity> {
    return this.userService.addBalance(userId, amount);
  }
}