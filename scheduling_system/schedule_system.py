#!/usr/bin/env python3
'''
Ferramenta simples de agendamento para serviços recorrentes.

Este script lê uma lista de clientes a partir de um arquivo CSV, calcula a
próxima data de serviço com base na periodicidade (mensal, trimestral,
semestral ou anual) e gera relatórios de visitas futuras. Ele também agrupa
os serviços por mês e região para auxiliar no planejamento de rotas e
renovações.

Para usar com seus próprios dados:

1. Edite o arquivo ``clients.csv`` na mesma pasta, substituindo os exemplos
   pelas informações de seus clientes. Certifique‑se de que as datas estejam
   no formato ``YYYY-MM-DD``.
2. Instale a dependência ``pandas`` caso ainda não tenha: ``pip install pandas``.
3. Execute ``python schedule_system.py`` para ver o resumo das próximas
   visitas e o agrupamento por mês/região.

Este script não envia notificações automaticamente, mas pode ser estendido
para integrar APIs de mensagens (WhatsApp, SMS ou e‑mail) de acordo com
as necessidades de sua empresa.
'''

from __future__ import annotations

import pandas as pd
from datetime import datetime
from pathlib import Path
from typing import Dict

# Mapeia a periodicidade (em português) para o número de meses a adicionar.
FREQ_TO_MONTHS: Dict[str, int] = {
    'mensal': 1,
    'trimestral': 3,
    'semestral': 6,
    'anual': 12,
}

def load_clients(file_path: Path) -> pd.DataFrame:
    '''Carrega a planilha de clientes e calcula a próxima data de serviço.'''
    df = pd.read_csv(file_path, parse_dates=['last_service_date'])
    # Converte a frequência para número de meses. Se não estiver mapeada, usa 1 mês como padrão.
    df['frequency_months'] = df['frequency'].str.lower().map(FREQ_TO_MONTHS).fillna(1).astype(int)
    # Calcula a próxima data de serviço usando DateOffset para respeitar o calendário
    df['next_service_date'] = df.apply(
        lambda row: row['last_service_date'] + pd.DateOffset(months=row['frequency_months']),
        axis=1
    )
    return df

def upcoming_services(df: pd.DataFrame, days_ahead: int = 30) -> pd.DataFrame:
    '''Filtra serviços cuja data está dentro dos próximos ``days_ahead`` dias.'''
    today = pd.Timestamp(datetime.now().date())
    df = df.copy()
    df['days_until_service'] = (df['next_service_date'] - today).dt.days
    upcoming = df[(df['days_until_service'] >= 0) & (df['days_until_service'] <= days_ahead)]
    return upcoming.sort_values('next_service_date')

def group_by_month(df: pd.DataFrame) -> pd.core.groupby.generic.DataFrameGroupBy:
    '''Agrupa os serviços pela data da próxima visita (mês) e retorna o agrupamento.'''
    df = df.copy()
    df['next_month'] = df['next_service_date'].dt.strftime('%Y-%m')
    return df.groupby('next_month')

def main() -> None:
    # Determina o caminho do arquivo CSV (na mesma pasta que este script)
    base_dir = Path(__file__).resolve().parent
    file_path = base_dir / 'clients.csv'
    if not file_path.exists():
        raise FileNotFoundError(f'Arquivo de dados não encontrado: {file_path}')
    df = load_clients(file_path)

    # Resumo de serviços nos próximos 30 dias
    print('\nResumo das próximas visitas (próximos 30 dias):')
    upcoming = upcoming_services(df, days_ahead=30)
    if upcoming.empty:
        print('Nenhum serviço agendado para os próximos 30 dias.')
    else:
        for _, row in upcoming.iterrows():
            date_str = row['next_service_date'].strftime('%d/%m/%Y')
            print(f"{date_str} - {row['client_name']} ({row['service_type']}) - {row['region']}")
    # Agrupamento por mês e região
    print('\nVisitas agrupadas por mês e região:')
    grouped = group_by_month(df)
    for month, group in grouped:
        print(f"\nMês {month}:")
        # Segundo nível de agrupamento por região
        for region, sub in group.groupby('region'):
            print(f"  Região {region}:")
            for _, row in sub.iterrows():
                date_str = row['next_service_date'].strftime('%d/%m/%Y')
                print(f"    {date_str} - {row['client_name']} ({row['service_type']})")

if __name__ == '__main__':
    main()
