using System;
using System.Collections.Generic;
using System.ComponentModel;
using System.Data;
using System.Drawing;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using System.Windows.Forms;
using VisualizadorServico.Servico;

namespace Principal
{
    public partial class Form1 : Form
    {
        public Form1()
        {
            InitializeComponent();
        }

        private void btnListar_Click(object sender, EventArgs e)
        {
            foreach (var item in Servico.ListarServico())
            {
                lbServico.Items.Add(item);
            }
            MessageBox.Show("Serviços Listados !");
        }
    }
}
