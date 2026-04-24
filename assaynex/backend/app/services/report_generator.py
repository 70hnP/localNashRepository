from __future__ import annotations

from io import BytesIO

from reportlab.lib.pagesizes import A4
from reportlab.pdfgen import canvas


def generate_pdf_report(payload: dict) -> bytes:
    buffer = BytesIO()
    pdf = canvas.Canvas(buffer, pagesize=A4)
    y = 800

    pdf.setFont("Helvetica-Bold", 16)
    pdf.drawString(50, y, "ASSAYNEX Advisory Report")
    y -= 30

    pdf.setFont("Helvetica", 10)
    for section in ["crude_properties", "yields", "recommendations", "energy_impact"]:
        pdf.drawString(50, y, f"{section}:")
        y -= 15
        data = payload.get(section, {})
        for key, value in data.items():
            pdf.drawString(70, y, f"- {key}: {value}")
            y -= 12
            if y < 80:
                pdf.showPage()
                y = 800
        y -= 8

    pdf.drawString(50, 40, "Advisory output only. Operator validation required.")
    pdf.save()

    buffer.seek(0)
    return buffer.read()
