# Sistema de Agendamento de Serviços

Este diretório contém um exemplo de **painel digital** para organizar os atendimentos de uma empresa de controle de pragas e limpeza. Ele foi pensado para substituir o quadro manual e ajudar a programar renovações trimestrais, semestrais e anuais sem esquecer de nenhum cliente.

## Estrutura dos arquivos

- `clients.csv` – Planilha com informações de clientes e serviços: nome, tipo de serviço, frequência (mensal, trimestral, semestral ou anual), data da última visita, telefone/WhatsApp, endereço e região.
- `schedule_system.py` – Script em Python que lê a planilha, calcula as próximas datas de atendimento e gera relatórios. Você pode executá‑lo em qualquer computador com Python e Pandas instalados.
- `README.md` – Este arquivo, com instruções de uso.

## Como usar

1. **Editar a planilha de clientes**: abra `clients.csv` e substitua os exemplos pelos seus clientes reais. Mantenha o formato das colunas e use datas no padrão `AAAA-MM-DD` (por exemplo, `2026-04-05`).
2. **Instalar dependências**: este script depende apenas da biblioteca [pandas](https://pandas.pydata.org/). Instale com:
   ```bash
   pip install pandas
   ```
3. **Executar o script**: no terminal, dentro da pasta `scheduling_system`, rode:
   ```bash
   python schedule_system.py
   ```
   O programa imprimirá:
   - Um resumo de todos os serviços agendados para os próximos 30 dias, com cliente, serviço e região.
   - Um agrupamento das visitas por mês e por região, últil para planejar rotas e otimizar o uso de combustível.

## Próximos passos

* **Integração com mensagens automáticas** – O script demonstra como calcular as datas, mas você pode estendê‑lo para enviar notificações via WhatsApp, SMS ou e‑mail usando APIs como Twilio. Isso ajudará a lembrar clientes de renovar contratos e confirmar visitas.
* **Interface web** – Para tornar o sistema ainda mais amigável, você pode transformar o script em uma aplicação web (por exemplo, usando Flask ou Django). Dessa forma, Diego e Léo podem acessar a lista de serviços pelo celular e marcar como concluído. Jean pode atualizar dados e acompanhar renovações em tempo real.
* **Análises avançadas** – Com o histórico de atendimentos, é possível gerar relatórios de produtividade, retenção de clientes e otimização de rotas. A biblioteca Pandas permite calcular métricas como frequência de visitas, taxa de renovação e valor recorrente mensal (MRR).

Este é um modelo básico para começar. Sinta‑se livre para adaptá‑lo às necessidades do seu negócio!
