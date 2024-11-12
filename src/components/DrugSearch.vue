<template>
  <v-container>
    <v-card class="mx-auto" max-width="800">
      <v-card-title>
        <v-icon large left color="primary">mdi-pill</v-icon>
        Búsqueda de Medicamentos
      </v-card-title>

      <v-card-text>
        <v-text-field
          v-model="searchQuery"
          label="Buscar medicamento"
          prepend-icon="mdi-magnify"
          @keyup.enter="search"
        ></v-text-field>

        <v-alert v-if="error" type="error">{{ error }}</v-alert>

        <v-progress-linear
          v-if="loading"
          indeterminate
          color="primary"
        ></v-progress-linear>

        <v-list v-if="drugs.length">
          <v-list-item v-for="drug in drugs" :key="drug.id">
            <v-list-item-avatar>
              <v-icon color="primary">mdi-medication</v-icon>
            </v-list-item-avatar>
            <v-list-item-content>
              <v-list-item-title>{{ getOpenFdaValue(drug.openfda, 'brand_name') }}</v-list-item-title>
              <v-list-item-subtitle>
                {{ getOpenFdaValue(drug.openfda, 'generic_name') }}
              </v-list-item-subtitle>
            </v-list-item-content>
            <v-list-item-action>
              <v-btn icon @click="showDetails(drug)">
                <v-icon>mdi-information</v-icon>
              </v-btn>
            </v-list-item-action>
          </v-list-item>
        </v-list>

        <v-alert v-else-if="!loading && searchQuery" type="info">
          No se encontraron resultados
        </v-alert>
      </v-card-text>
    </v-card>

    <v-dialog v-model="dialog" max-width="600">
      <v-card v-if="selectedDrug">
        <v-card-title>
          <v-icon left color="primary">mdi-pill</v-icon>
          {{ getOpenFdaValue(selectedDrug.openfda, 'brand_name') }}
        </v-card-title>
        <v-card-text>
          <v-list dense>
            <v-list-item>
              <v-list-item-content>
                <v-list-item-title>Nombre genérico</v-list-item-title>
                <v-list-item-subtitle>
                  {{ getOpenFdaValue(selectedDrug.openfda, 'generic_name') }}
                </v-list-item-subtitle>
              </v-list-item-content>
            </v-list-item>
            <v-list-item v-if="selectedDrug.warnings">
              <v-list-item-content>
                <v-list-item-title>Advertencias</v-list-item-title>
                <v-list-item-subtitle>
                  {{ selectedDrug.warnings[0] }}
                </v-list-item-subtitle>
              </v-list-item-content>
            </v-list-item>
          </v-list>
        </v-card-text>
        <v-card-actions>
          <v-spacer></v-spacer>
          <v-btn color="primary" text @click="dialog = false">
            Cerrar
          </v-btn>
        </v-card-actions>
      </v-card>
    </v-dialog>
  </v-container>
</template>

<script>
import { mapState, mapActions } from 'vuex';

export default {
  name: 'DrugSearch',
  data() {
    return {
      searchQuery: '',
      dialog: false,
      selectedDrug: null,
    };
  },
  computed: {
    ...mapState(['drugs', 'loading', 'error']),
  },
  methods: {
    ...mapActions(['searchDrugs']),
    async search() {
      if (this.searchQuery.trim()) {
        await this.searchDrugs(this.searchQuery);
      }
    },
    showDetails(drug) {
      this.selectedDrug = drug;
      this.dialog = true;
    },
    getOpenFdaValue(obj, path, defaultValue = 'N/A') {
      if (!obj || typeof obj !== 'object') return defaultValue;
      const value = path.split('.').reduce((o, i) => (o ? o[i] : null), obj);
      return value !== null && value !== undefined ? value : defaultValue;
    },
  },
};
</script>