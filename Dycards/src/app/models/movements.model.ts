export interface Movement {
    movements_id: number;
    account_id: number;
    type: string;
    amount: number;
    date: string;
    // Asegúrate que esta línea exista:
    monto: number; // ← opcional si el backend la envía con ese nombre
}

export interface MovementResponse {
  numeroCuenta: string;
  saldo: string;
  movements: Movement[];
}
