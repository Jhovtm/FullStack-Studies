```vue
<script setup lang="ts">
import { ref, onMounted } from 'vue'

interface Aluguel {
  id_aluguel: number
  cliente: string
  livro: string
  data_aluguel: string
  data_devolucao: string | null
}

const alugueis = ref<Aluguel[]>([])
const carregando = ref(true)
const erro = ref('')

onMounted(async () => {
  try {
    const resposta = await fetch('http://localhost:3000/alugueis')

    if (!resposta.ok) {
      throw new Error('Erro ao buscar os aluguéis.')
    }

    alugueis.value = await resposta.json()
  } catch {
    erro.value = 'Não foi possível carregar os aluguéis.'
  } finally {
    carregando.value = false
  }
})
</script>

<template>
  <main class="section">
    <div class="container">
      <header class="mb-5">
        <p class="subtitle is-6 has-text-link">
          BIBLIOTECA
        </p>

        <h1>
          Lista de aluguéis
        </h1>

        <p class="subtitle is-6 has-text-grey">
          Consulte os livros alugados e suas datas.
        </p>
      </header>

      <div class="box">
        <div class="level mb-4">
          <div class="level-left">
            <h2 class="title is-5 mb-0">
              Aluguéis registrados
            </h2>
          </div>

          <div class="level-right">
            <span class="tag is-link is-light is-medium">
              {{ alugueis.length }} registros
            </span>
          </div>
        </div>

        <div v-if="carregando" class="has-text-centered p-5">
          <button class="button is-loading is-white">
            Carregando
          </button>
        </div>

        <div v-else-if="erro" class="notification is-danger is-light">
          {{ erro }}
        </div>

        <div v-else-if="alugueis.length === 0"
             class="notification is-info is-light">
          Nenhum aluguel encontrado.
        </div>

        <div v-else class="table-container">
          <table class="table is-fullwidth is-hoverable is-striped">
            <thead>
              <tr>
                <th>ID</th>
                <th>Cliente</th>
                <th>Livro</th>
                <th>Data do aluguel</th>
                <th>Data da devolução</th>
              </tr>
            </thead>

            <tbody>
              <tr v-for="item in alugueis" :key="item.id_aluguel">
                <td>{{ item.id_aluguel }}</td>
                <td>{{ item.cliente }}</td>
                <td>{{ item.livro }}</td>
                <td>{{ item.data_aluguel }}</td>
                <td>
                  <span
                    v-if="item.data_devolucao"
                    class="tag is-success is-light"
                  >
                    {{ item.data_devolucao }}
                  </span>
                  <span v-else class="tag is-warning is-light">
                    Pendente
                  </span>
                </td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>

      <footer class="has-text-centered mt-5">
        <p class="is-size-7 has-text-grey">
          Sistema de gerenciamento de biblioteca
        </p>
      </footer>
    </div>
  </main>
</template>

<style>
body {
  background-color: #cb2a5d;
  min-height: 100vh;
}


.table th {
  white-space: nowrap;
  table-layout: fixed;
  font-family:'Segoe UI', Tahoma, Geneva, Verdana, sans-serif;
  color: aliceblue;
}

.box {
  border-radius: 12px;
  box-shadow: 0 4px 18px rgba(30, 45, 80, 0.06);
}

.title {
  color: #243653;
}

.table td {
  vertical-align: middle;
}
</style>
```